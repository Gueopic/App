import { StorageService } from './storage.service';

export abstract class AbstractDatabaseService<T> {
  protected abstract tableName;

  constructor(protected dbService: StorageService) {}

  async getNextId(): Promise<number> {
    return await this.dbService.getNextIdFor(this.tableName);
  }

  async get(id: string, defaultElement?: T): Promise<T> {
    return await this.dbService.getElement(this.tableName, id, defaultElement) as T;
  }

  async getAll(): Promise<T[]> {
    return await this.dbService.get(this.tableName);
  }

  async insert(elements: T[]): Promise<void> {
    return await this.dbService.addElements(this.tableName, elements);
  }

  async update(elements: T[]): Promise<void> {
    return await this.dbService.updateElements(this.tableName, elements);
  }

  async remove(elements: T[]): Promise<void> {
    return await this.dbService.removeElements(this.tableName, elements);
  }

  async empty(): Promise<void> {
    return await this.dbService.removeAllElements(this.tableName);
  }
}
