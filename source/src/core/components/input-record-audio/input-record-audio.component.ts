import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { RecordingData } from 'capacitor-voice-recorder';
import {
  BehaviorSubject,
  combineLatest,
  interval,
  Observable,
  Subject,
} from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { map, skip, skipLast, takeUntil, takeWhile } from 'rxjs/operators';
import { FileData } from 'src/core/models/file-data.model';
import { AudioService } from 'src/core/services/audio.service';
import { InputFileService } from 'src/core/services/input-file.service';

enum StatusAudioEnum {
  empty = 'empty',
  recording = 'recording',
  playing = 'playing',
  stopped = 'stopped',
}
@Component({
  selector: 'gueo-input-record-audio',
  templateUrl: './input-record-audio.component.html',
  styleUrls: ['./input-record-audio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputRecordAudioComponent),
    },
  ],
})
export class InputRecordAudioComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  disabled = false;
  // TODO: change with async in the document? (check performance)
  fileData$ = new BehaviorSubject<FileData<RecordingData>>(null);
  isRecording$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isPlaying$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  recordTimer: Observable<number>;
  status: Observable<StatusAudioEnum>;
  statusAudioEnum = StatusAudioEnum;

  private onChange$: any;
  private onTouched$: any;
  private ngControl: NgControl;
  private fileChange$: Subscription;
  private destroy$ = new Subject<void>();

  constructor(
    private inputFileService: InputFileService,
    private inj: Injector,
    private changeDetector: ChangeDetectorRef,
    private audioService: AudioService
  ) {}

  ngOnInit() {
    this.ngControl = this.inj.get<NgControl>(NgControl as any);
    this.status = combineLatest([
      this.isRecording$,
      this.isPlaying$,
      this.fileData$,
    ]).pipe(
      map(([isRecording, isPlaying, fileData]) => {
        if (isRecording) {
          return StatusAudioEnum.recording;
        }
        if (isPlaying) {
          return StatusAudioEnum.playing;
        }
        if (fileData) {
          return StatusAudioEnum.stopped;
        }
        return StatusAudioEnum.empty;
      }),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy() {
    if (this.isRecording$.value) {
      this.audioService.stopRecording();
    }
    this.isRecording$.next(false);
    this.destroy$.next();
    if (this.fileChange$) {
      this.fileChange$.unsubscribe();
    }
  }

  writeValue(file: FileData<RecordingData>): void {
    if (this.fileData$.value !== file) {
      this.setFile(file);
    }
  }

  // TODO: Improve with RXJS?
  async startRecord(event: Event, retry = true) {
    event.preventDefault();
    if (this.isRecording$.value) {
      return;
    }
    try {
      await this.audioService.startRecording();
      this.isRecording$.next(true);
      this.startTimer();
      this.changeDetector.detectChanges();
    } catch (ex) {
      console.error('INPUT AUDIO RECORD:', ex);
      if (ex) {
        if (retry && ex.toString().indexOf('ALREADY_RECORDING')) {
          await this.audioService.stopRecording();
          return await this.startRecord(event, false);
        }
        this.ngControl.control.setErrors(ex);
      }
    } finally {
      this.onTouched$();
    }
  }

  async stopRecording(event: Event) {
    event.preventDefault();
    if (!this.isRecording$.value) {
      return;
    }
    try {
      const audio = await this.audioService.stopRecording();
      this.isRecording$.next(false);
      this.setFile(audio);
      this.changeDetector.detectChanges();
    } catch (ex) {
      console.error('INPUT AUDIO RECORD:', ex);
      if (ex) {
        this.ngControl.control.setErrors(ex);
      }
    }
  }

  async reproduceAudio() {
    if (this.fileData$) {
      // TODO: Improve the service to listen when finish playing
      // this.isPlaying$.next(true);
      await this.audioService.playAudioFile(this.fileData$.value);
    }
  }

  removeAudio() {
    if (this.fileData$) {
      this.setFile(null);
      this.changeDetector.detectChanges();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange$ = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched$ = fn;
  }

  private async setFile(file: FileData<RecordingData>): Promise<void> {
    this.fileData$.next(file);
    if (this.onChange$) {
      this.onChange$(file || null);
    }
  }

  private startTimer(): void {
    this.recordTimer = combineLatest([interval(100), this.isRecording$]).pipe(
      takeWhile(([, isRecording$]) => !!isRecording$),
      map(([time]) => time),
      skipLast(1) // Better acurated record time
    );
  }
}
