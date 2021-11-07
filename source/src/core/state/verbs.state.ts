import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { VerbsDatabaseService } from '../database/verbs-database.service';
import { FileData } from '../models/file-data.model';
import { VerbWithFilesModel } from '../models/verb-with-files.model';
import { VerbModel } from '../models/verb.model';
import { FilesystemService } from '../services/filesystem.service';
import { StateFromDB, StateFromDBService } from './core/state-db.base';

class State extends StateFromDB<VerbModel> {
  verbsWithFiles = new BehaviorSubject<VerbWithFilesModel[]>(null);
  verbsWithFilesIndexed: { [id: string]: VerbWithFilesModel } = {};
}

export const VERBS_FOLDER = 'verbs';

@Injectable({
  providedIn: 'root',
})
export class VerbsStateService extends StateFromDBService<
  VerbModel,
  VerbsDatabaseService
> {
  state = new State();

  readonly verbsWithFiles = this.state.verbsWithFiles.asObservable();

  constructor(
    private verbsDatabase: VerbsDatabaseService,
    private filesystemService: FilesystemService
  ) {
    super(verbsDatabase);
    this.verbsChangeListener();
  }

  async insert(element: VerbWithFilesModel): Promise<void> {
    // Save the files
    const nextId = await this.dbService.getNextId();
    if (element.audio){
      element.audioFileName = await this.persistAudio(nextId, element.audio);
    }

    // Store in the database
    const cleanModel = this.mapToModel(element);
    cleanModel.audioLength = element.audio?.originalFile?.value.msDuration;
    await super.insert(cleanModel);
  }

  async update(element: VerbWithFilesModel): Promise<void> {
    const original = this.state.verbsWithFilesIndexed[element.id];
    original.text = element.text;

    // Save the files if changed
    if (element.audio?.originalFile) {
      if (original.audioFileName) {
        this.filesystemService.delete(original.audioFileName);
      }
      original.audioFileName = await this.persistAudio(
        original.id,
        element.audio
      );
    }

    const cleanModel = this.mapToModel(original);
    await super.update(cleanModel);
  }

  async remove(element: VerbWithFilesModel): Promise<void> {
    if (element.audioFileName) {
      this.filesystemService.delete(element.audioFileName);
    }

    await super.remove(element);
  }

  private mapToModel(element: VerbWithFilesModel): VerbModel {
    return {
      id: element.id,
      text: element.text,
      audioFileName: element.audioFileName,
      audioLength: element.audioLength,
    };
  }

  private verbsChangeListener(): void {
    this.elements$
      .pipe(
        distinctUntilChanged(),
        switchMap((verbs) => from(this.appendFileDataToVerbs(verbs))),
        tap((verbsWithFiles) => {
          this.state.verbsWithFiles.next(verbsWithFiles);
        })
      )
      .subscribe();
  }

  /**
   * Create a new array with all verbs with the corresponding files attached
   * This will use "verbsWithFilesIndexed" to improve performance
   *
   * @param newVerbs New verbs retrieved
   */
  private async appendFileDataToVerbs(
    newVerbs: VerbModel[]
  ): Promise<VerbWithFilesModel[]> {
    if (!newVerbs) {
      return [];
    }
    const currentVerbs = this.state.verbsWithFilesIndexed;
    const mappedVerbs: VerbWithFilesModel[] = [];

    for (const verb of newVerbs) {
      let currentVerb: VerbWithFilesModel = currentVerbs[verb.id];
      if (!currentVerb || verb.audioFileName !== currentVerb.audioFileName) {
        currentVerbs[verb.id] = currentVerb = await this.createVerbData(verb);
      }
      mappedVerbs.push(currentVerb);
    }

    return mappedVerbs;
  }

  private async createVerbData(verb: VerbModel): Promise<VerbWithFilesModel> {
    let audio;
    try {
      if (verb.audioFileName) {
        audio = await this.filesystemService.read(verb.audioFileName);
      }
    } catch (ex) {}

    return {
      ...verb,
      audio,
    };
  }

  private async persistAudio(
    id: number | string,
    image: FileData<any>
  ): Promise<string> {
    // TODO: get extension with the FileData class
    const destinationFilePath = `${VERBS_FOLDER}/${id.toString()}/${Date.now()}.ogg`;
    await this.filesystemService.writeFileData(image, destinationFilePath);
    return image.filePath;
  }
}
