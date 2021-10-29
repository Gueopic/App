import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { VerbsDatabaseService } from '../database/verbs-database.service';
import { FileData } from '../models/file-data.model';
import { VerbWithFilesModel } from '../models/verb-with-files.model';
import { VerbModel } from '../models/verb.model';
import { StateFromDB, StateFromDBService } from './core/state-db.base';

class State extends StateFromDB<VerbModel> {
  verbsWithFiles = new BehaviorSubject<VerbWithFilesModel[]>(null);
  verbsWithFilesIndexed: { [id: string]: VerbWithFilesModel } = {};
}

@Injectable({
  providedIn: 'root',
})
export class VerbsStateService extends StateFromDBService<
  VerbModel,
  VerbsDatabaseService
> {
  state = new State();

  readonly verbsWithFiles = this.state.verbsWithFiles.asObservable();

  constructor(private verbsDatabase: VerbsDatabaseService) {
    super(verbsDatabase);
    this.verbsChangeListener();
  }

  private verbsChangeListener(): void {
    this.elements$
      .pipe(
        distinctUntilChanged(),
        tap((verbs) => {
          this.state.verbsWithFiles.next(this.appendFileDataToVerbs(verbs));
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
  private appendFileDataToVerbs(newVerbs: VerbModel[]): VerbWithFilesModel[] {
    if (!newVerbs) {
      return [];
    }
    const currentVerbs = this.state.verbsWithFilesIndexed;
    const mappedVerbs: VerbWithFilesModel[] = [];

    for (const verb of newVerbs) {
      let currentVerb: VerbWithFilesModel = currentVerbs[verb.id];
      if (
        !currentVerb ||
        verb.audioFileName !== currentVerb.audioFileName ||
        verb.imageFilename !== currentVerb.imageFilename
      ) {
        currentVerbs[verb.id] = currentVerb = this.createVerbData(verb);
      }
      mappedVerbs.push(currentVerb);
    }

    return mappedVerbs;
  }

  private createVerbData(verb: VerbModel): VerbWithFilesModel {
    const audio = new FileData<any>();
    audio.filePath = verb.audioFileName;

    return {
      ...verb,
      audio,
    };
  }
}
