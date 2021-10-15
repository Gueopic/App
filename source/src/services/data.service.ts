import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImgText, PhraseData } from 'src/interfaces/global.interfaces';

const MOCKED_PHRASES_DATA: PhraseData[] = [
  { phrase: 'JO ESTIC', id: 1 },
  { phrase: 'JO VULL', id: 2 },
  { phrase: 'SI', id: 3 },
];

const MOCKED_OBJECTS_DATA: ImgText[] = [
  { src: '../../assets/test-imgs/brown-man-icon.png', text: 'TARONJA', id: 1 },
  { src: '../../assets/test-imgs/brown-man-icon.png', text: 'IOGURT', id: 2 },
  { src: '../../assets/test-imgs/brown-man-icon.png', text: 'PATE', id: 3 },
  { src: '../../assets/test-imgs/brown-man-icon.png', text: 'PA', id: 4 },
  { src: '../../assets/test-imgs/brown-man-icon.png', text: 'LLET', id: 5 },
  {
    src: '../../assets/test-imgs/brown-man-icon.png',
    text: 'AURICULARS',
    id: 6,
  },
];

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private phraseObjectData$: BehaviorSubject<PhraseData[]> =
    new BehaviorSubject(MOCKED_PHRASES_DATA);

  private objectData$: BehaviorSubject<ImgText[]> = new BehaviorSubject(
    MOCKED_OBJECTS_DATA
  );

  get phraseObject$(): Observable<PhraseData[]> {
    return this.phraseObjectData$.asObservable();
  }

  get object$(): Observable<ImgText[]> {
    return this.objectData$.asObservable();
  }

  deletePhraseObject(id: number) {
    const index = MOCKED_PHRASES_DATA.findIndex((data) => data.id === id);
    MOCKED_PHRASES_DATA.splice(index, 1);
    this.phraseObjectData$.next(MOCKED_PHRASES_DATA);
  }

  createPhraseObject() {}

  deleteObject(id: number) {
    const index = MOCKED_OBJECTS_DATA.findIndex((data) => data.id === id);
    MOCKED_OBJECTS_DATA.splice(index, 1);
    this.objectData$.next(MOCKED_OBJECTS_DATA);
  }
}
