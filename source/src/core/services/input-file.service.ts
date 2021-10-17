import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class InputFileService {
  constructor(private _sanitizer: DomSanitizer) {}

  // isImage(file: FileData<any>): boolean {
  //   return file && file.mimePart && file.mimePart.indexOf('image') > -1;
  // }

  // resourcePath(file: FileData<any>): SafeResourceUrl {
  //   return this._sanitizer.bypassSecurityTrustResourceUrl(
  //     `${file.mimePart},${file.data}`
  //   );
  // }
}
