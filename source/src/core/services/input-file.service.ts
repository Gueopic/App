import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileData } from '../models/file-data.model';

@Injectable({
  providedIn: 'root',
})
export class InputFileService {
  constructor(private _sanitizer: DomSanitizer) {}

  async isImage(file: FileData<any>): Promise<boolean> {
    const mime = await file?.getMime();
    return file && mime && mime.indexOf('image') > -1;
  }

  async resourcePath(file: FileData<any>): Promise<SafeResourceUrl> {
    const base64 = await file?.getBase64();
    if (base64) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(base64);
    }
  }

}
