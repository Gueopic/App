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
import { SafeResourceUrl } from '@angular/platform-browser';
import { Photo } from '@capacitor/camera';
import { Subscription } from 'rxjs/internal/Subscription';
import { FileData } from 'src/core/models/file-data.model';
import { CameraService } from 'src/core/services/camera.service';

@Component({
  selector: 'gueo-input-camera',
  templateUrl: './input-camera.component.html',
  styleUrls: ['./input-camera.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputCameraComponent),
    },
  ],
})
export class InputCameraComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  disabled = false;
  // TODO: change with async in the document? (check performance)
  imagePath: SafeResourceUrl | string;
  fileData: FileData<Photo>;

  private onChange$: any;
  private onTouched$: any;
  private ngControl: NgControl;
  private fileChange$: Subscription;

  constructor(
    private inj: Injector,
    private changeDetector: ChangeDetectorRef,
    private cameraService: CameraService,
  ) {}

  ngOnInit() {
    this.ngControl = this.inj.get<NgControl>(NgControl as any);
  }

  ngOnDestroy() {
    if (this.fileChange$) {
      this.fileChange$.unsubscribe();
    }
  }

  writeValue(file: FileData<Photo>): void {
    if (this.fileData !== file) {
      this.setFile(file);
    }
  }

  async getImage(event: Event) {
    event.preventDefault();
    try {
      const image = await this.cameraService.takePicture();
      this.setFile(image);
    } catch (ex) {
      console.error('INPUT CAMERA:', ex);
      if (ex) {
        this.ngControl.control.setErrors(ex);
      }
    } finally {
      this.onTouched$();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange$ = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched$ = fn;
  }

  private async setFile(file: FileData<Photo>): Promise<void> {
    this.fileData = file;
    if (this.onChange$) {
      this.onChange$(this.fileData || null);
    }
    if (this.fileData) {
      this.imagePath = await file.getWebPath();
      this.changeDetector.markForCheck();
    }
  }
}
