import { Capacitor } from '@capacitor/core';
import { readAsBase64 } from '../utils/file.util';

/**
 * Adapter to work with files
 * It just need to be feed with a BASE 64 OR FILE PATH to work with the file and almost everything (except store files)
 * If you are getting a file from the system, use "FileSystemService.read", so an instance of this class will be generated automatically
 *
 * "OriginalFile" is the only part that need to be filled manually.
 * "Original FIle" IS ONLY FOR UPDATES, you don't need to use (util for example for forms)
 */
export class FileData<T> {
  private base64: string;
  private _originalFile: T;
  private _relativePath: string;
  private _filePath: string;
  private _webPath: string;
  private _mimeType: string;

  constructor(originalFile?: T) {
    this._originalFile = originalFile;
  }

  // get name(): string {
  //   return this.file.name;
  // }

  get originalFile(): T {
    return this._originalFile;
  }

  get relativePath(): string {
    return this._relativePath;
  }

  set relativePath(relativePath: string) {
    this._relativePath = relativePath;
  }

  get filePath(): string {
    return this._filePath;
  }

  set filePath(filePath: string) {
    this._filePath = filePath;
  }

  setBase64(base64: string) {
    const fileResultData = base64.split(',');
    this._mimeType = fileResultData[0];
    this.base64 = fileResultData[1];
  }

  async getBase64(): Promise<string> {
    if (!this.base64) {
      if (!this.filePath) {
        throw new Error('No base64 or filePath specified to get the base64');
      }
      this.setBase64(await readAsBase64(this.filePath));
    }
    return `${this._mimeType},${this.base64}`;
  }

  async getMime(): Promise<string> {
    if (!this._mimeType) {
      await this.getBase64();
    }
    return this._mimeType;
  }

  async getWebPath(): Promise<string> {
    if (!this._webPath) {
      if (Capacitor.isNativePlatform() && this.filePath) {
        // Display the new image by rewriting the 'file://' path to HTTP
        // Details: https://ionicframework.com/docs/building/webview#file-protocol
        this._webPath = Capacitor.convertFileSrc(this.filePath);
      }
      else {
        // Use webPath to display the new image instead of base64 since
        this._webPath = await this.getBase64();
      }
    }

    return this._webPath;
  }

  /**
   * Set only if you already have already a webPath OR you have only base64 and have webpath
   * Is just for performance
   *
   * @param uri
   */
  setWebPath(uri: string): void {
    this._webPath = uri;
  }
}