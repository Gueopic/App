import { StorageService } from './storage.service';

export abstract class AbstractDatabaseService<T> {
  protected abstract tableName;

  constructor(protected dbService: StorageService) {}

  async getAll(): Promise<T[]> {
    return await this.dbService.get(this.tableName);
  }

  async insert(elements: T[]): Promise<void> {
    return await this.dbService.addElements(this.tableName, elements);
  }

  async update(elements: T[]): Promise<void> {
    return await this.dbService.removeElements(this.tableName, elements);
  }

  async remove(elements: T[]): Promise<void> {
    return await this.dbService.removeElements(this.tableName, elements);
  }
}
