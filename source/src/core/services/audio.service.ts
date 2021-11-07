import { Injectable } from '@angular/core';
import { RecordingData, VoiceRecorder } from 'capacitor-voice-recorder';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileData } from '../models/file-data.model';

// doc: https://www.npmjs.com/package/capacitor-voice-recorder

export enum ReproduceStatusEnum {
  playing = 'PLAYING',
  stopped = 'STOPPED',
  ended = 'ENDED',
}

@Injectable()
export class AudioService {
  private currentAudio: InstanceType<typeof Audio>;
  private _status$ = new BehaviorSubject<ReproduceStatusEnum>(
    ReproduceStatusEnum.stopped
  );

  private _forceStop$ = new BehaviorSubject<any>(null);

  get status$(): Observable<ReproduceStatusEnum> {
    return this._status$.asObservable();
  }

  async requestAudioRecording(): Promise<boolean> {
    const hasPermission = await VoiceRecorder.requestAudioRecordingPermission();
    return hasPermission.value;
  }

  async startRecording(): Promise<boolean> {
    try {
      if (!(await this.requestAudioRecording())) {
        throw new Error('No permissions granted to record audio');
      }
      const startRecording = await VoiceRecorder.startRecording();
      return startRecording.value;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async stopRecording(): Promise<FileData<RecordingData>> {
    try {
      const record: RecordingData = await VoiceRecorder.stopRecording();
      return this.convertToFileData(record);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async playAudio(audio: InstanceType<typeof Audio>): Promise<void> {
    // const audioRef = new Audio(`data:audio/aac;base64,${base64Sound}`);
    this.stopAudio();
    this.currentAudio = audio;
    audio.oncanplaythrough = () => audio.play();
    audio.onplay = () => this._status$.next(ReproduceStatusEnum.playing);
    audio.onpause = () => this._status$.next(ReproduceStatusEnum.stopped);
    audio.onended = () => this._status$.next(ReproduceStatusEnum.ended);
    audio.load();
  }

  async playAudioFile(fileData: FileData<RecordingData>) {
    const audioRef = new Audio(await fileData.getBase64Data());
    return this.playAudio(audioRef);
  }

  stopAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.oncanplaythrough = () => {};
    }
    this._forceStop$.next({});
  }

  convertToFileData(record: RecordingData): FileData<RecordingData> {
    const fileData = new FileData(record);
    fileData.setBase64(
      `data:audio/aac;base64,${record.value.recordDataBase64}`
    );
    return fileData;
  }

  // private getStatusObservableUntilStopped(): Observable<ReproduceStatusEnum> {
  //   return this.status$.pipe(
  //     takeWhile((status) => status !== ReproduceStatusEnum.playing)
  //   );
  // }
}
