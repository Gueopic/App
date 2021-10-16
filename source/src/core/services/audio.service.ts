import { Injectable } from '@angular/core';
import { RecordingData, VoiceRecorder } from 'capacitor-voice-recorder';

// doc: https://www.npmjs.com/package/capacitor-voice-recorder

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  async requestAudioRecording(): Promise<boolean> {
    const hasPermission = await VoiceRecorder.requestAudioRecordingPermission();
    return hasPermission.value;
  }

  async startRecording(): Promise<boolean> {
    try {
      const startRecording = await VoiceRecorder.startRecording();
      return startRecording.value;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async stopRecording(): Promise<RecordingData> {
    try {
      const stopRecording: RecordingData = await VoiceRecorder.stopRecording();
      return stopRecording;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async playAudioFile() {
    const base64Sound = ''; // get from db
    const audioRef = new Audio(`data:audio/aac;base64,${base64Sound}`);
    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();
  }
}
