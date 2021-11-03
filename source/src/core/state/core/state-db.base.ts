import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractDatabaseService } from 'src/core/database/core/abstract-database.service';
import { StorageElement } from 'src/core/database/core/storage.elements';
import { StateBase } from './state.base';

export class StateFromDB<MainModel> {
  elements = new BehaviorSubject<MainModel[]>(null);
}

/**
 * This class adapts a DatabaseService to an State
 * This implies that you can retrieve data without being to access the whole time to the database
 * Also you an extend and map the data to fit your needs, convert to other models, etc...
 *
 * @example declaration
 * export class VerbsStateService<VerbsModel, VerbsDatabaseService> {
 *  // Your extended code here
 * }
 *
 * @example implementation
 * constructor(verbsState: VerbsState)
 * ngOnInit() { this.verbsState.loadAll() }
 *
 * // Somewhere in TS (or other file)
 * this.verbsState.verbs$
 *
 * // Somewhere in HTML (or other HTML)
 * <div>verbsState.verbs$ | async</div>
 */
export abstract class StateFromDBService<
  MainModel extends StorageElement,
  DbService extends AbstractDatabaseService<any>
> extends StateBase {
  protected abstract state: StateFromDB<MainModel>;

  /**
   * Please, ensure to call "loadAll" before access this
   */
  get elements$(): Observable<MainModel[]> {
    return this.state.elements.asObservable();
  }
  get elements(): MainModel[] {
    return this.state.elements.value;
  }
  set elements(elements: MainModel[]) {
    this.state.elements.next(elements);
  }

  constructor(protected dbService: DbService) {
    super();
  }

  async loadAll(forceReload: boolean = false): Promise<void> {
    if (!forceReload && this.elements) {
      return;
    }
    this.elements = await this.dbService.getAll();
  }


  getById(id: string): MainModel {
    return this.elements.find(el => el.id === id);
  }

  async insert(element: MainModel): Promise<void> {
    this.elements = await this.dbService.insert([element]);
  }

  async insertMultiple(elements: MainModel[]): Promise<void> {
    this.elements = await this.dbService.insert(elements);
  }

  async update(element: MainModel): Promise<void> {
    this.elements = await this.dbService.update([element]);
  }

  async updateMultiple(elements: MainModel[]): Promise<void> {
    this.elements = await this.dbService.update(elements);
  }

  async remove(element: MainModel): Promise<void> {
    this.elements = await this.dbService.remove([element]);
  }

  async removeMultiple(elements: MainModel[]): Promise<void> {
    this.elements = await this.dbService.remove(elements);
  }
}
