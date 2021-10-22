import { Injectable } from '@angular/core';
import { RecordingData, VoiceRecorder } from 'capacitor-voice-recorder';
import { FileData } from '../models/file-data.model';

// doc: https://www.npmjs.com/package/capacitor-voice-recorder

@Injectable()
export class AudioService {
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

  async playAudio(audio: InstanceType<typeof Audio>) {
    // const audioRef = new Audio(`data:audio/aac;base64,${base64Sound}`);
    audio.oncanplaythrough = () => audio.play();
    audio.load();
  }

  async playAudioFile(fileData: FileData<RecordingData>) {
    const audioRef = new Audio(await fileData.getBase64());
    return this.playAudio(audioRef);
  }

  convertToFileData(record: RecordingData): FileData<RecordingData> {
    const fileData = new FileData(record);
    fileData.setBase64(
      `data:audio/aac;base64,${record.value.recordDataBase64}`
    );
    return fileData;
  }
}