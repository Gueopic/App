import { StorageElement } from './storage.elements';
import { StorageService } from './storage.service';

export abstract class AbstractDatabaseService<MODEL = StorageElement> {
  protected abstract tableName;

  constructor(protected dbService: StorageService<MODEL>) {}

  async getNextId(): Promise<number> {
    return await this.dbService.getNextIdFor(this.tableName);
  }

  async get(id: string, defaultElement?: MODEL): Promise<MODEL> {
    return await this.dbService.getElement(this.tableName, id, defaultElement) as MODEL;
  }

  async getAll(): Promise<MODEL[]> {
    return await this.dbService.get(this.tableName);
  }

  async insert(elements: MODEL[]): Promise<MODEL[]> {
    return await this.dbService.addElements(this.tableName, elements);
  }

  async update(elements: MODEL[]): Promise<MODEL[]> {
    return await this.dbService.updateElements(this.tableName, elements);
  }

  async remove(elements: MODEL[]): Promise<MODEL[]> {
    return await this.dbService.removeElements(this.tableName, elements);
  }

  async empty(): Promise<void> {
    return await this.dbService.removeAllElements(this.tableName);
  }
}
