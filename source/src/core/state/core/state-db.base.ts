import { element } from 'protractor';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AbstractDatabaseService } from 'src/core/database/core/abstract-database.service';
import { StorageElement } from 'src/core/database/core/storage.elements';
import { StateBase } from './state.base';

export class StateFromDB<MainModel> {
  items = new BehaviorSubject<MainModel[]>(null);
}

/**
 * This class adapts a DatabaseService to an State
 * This implies that you can retrieve data without being to access the whole time to the database
 * Also you an extend and map the data to fit your needs, convert to other models, etc...
 *
 * @example declaration
 * export class ItemsState<ItemsModel, ItemsDatabaseService> {
 *  // Your extended code here
 * }
 *
 * @example implementation
 * constructor(itemsState: ItemsState)
 * ngOnInit() { this.itemsState.loadAll() }
 *
 * // Somewhere in TS (or other file)
 * this.itemsState.items$
 *
 * // Somewhere in HTML (or other HTML)
 * <div>itemsState.items$ | async</div>
 */
export abstract class StateFromDBSerice<
  MainModel extends StorageElement,
  DbService extends AbstractDatabaseService<any>
> extends StateBase {
  protected abstract state: StateFromDB<MainModel>;

  /**
   * Please, ensure to call "loadAll" before access this
   */
  get items$(): Observable<MainModel[]> {
    return this.state.items.asObservable();
  }
  get items(): MainModel[] {
    return this.state.items.value;
  }
  set items(items: MainModel[]) {
    this.state.items.next(items);
  }

  constructor(protected dbService: DbService) {
    super();
  }

  async loadAll(forceReload: boolean = false): Promise<MainModel[]> {
    if (!forceReload && this.items) {
      return;
    }
    this.items = await this.dbService.getAll();
    return this.items$.toPromise();
  }

  async insert(elements: MainModel[]): Promise<MainModel[]> {
    this.items = await this.dbService.insert(elements);
    return this.items$.toPromise();
  }

  async update(elements: MainModel[]): Promise<MainModel[]> {
    this.items = await this.dbService.update(elements);
    return this.items$.toPromise();
  }

  async remove(elements: MainModel[]): Promise<MainModel[]> {
    this.items = await this.dbService.remove(elements);
    return this.items$.toPromise();
  }
}
