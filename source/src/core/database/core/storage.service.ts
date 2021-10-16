import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StorageElement } from './storage.elements';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storageService: Storage) {
    this.init();
  }

  async init(): Promise<void> {
    console.debug('Loading database');
    this._storage = await this.storageService.create();
  }

  async get(key: string, defaultValue?: any): Promise<any> {
    return (await this._storage.get(key) || defaultValue);
  }

  public async replace(key: string, value: any): Promise<void> {
    return this._storage.set(key, value);
  }

  public async remove(key: string): Promise<void> {
    return this._storage.remove(key);
  }

  public async getElements(
    key: string,
    elementIds?: string[]
  ): Promise<StorageElement[]> {
    const elements: StorageElement[] = await this.get(key);

    if (elementIds) {
      return elements.filter((element) => elementIds.indexOf(element.id) > -1);
    }
    return elements;
  }


  public async getNextIdFor(key: string): Promise<number> {
    return (await this.get(`${key}_next_id`)) || 1;
  }

  /**
   * Add to array store, if not exist, create a new array
   * Create a new ID to each element even if they already have one
   *
   * @param key Array key
   * @param value Value to store (object/array/primitive)
   */
  public async addElements(
    key: string,
    elements: StorageElement[]
  ): Promise<void> {
    let nextId = await this.getNextIdFor(key);
    try {
      const newArray: any[] = await this.get(key, []);
      for (const element of elements) {
        element.id = (nextId++).toString();
        newArray.push(element);
      }
      this.setNextIdFor(key, nextId);
      this.replace(key, newArray);
    } catch (ex) {
      console.error('Error adding to storage', ex);
      throw ex;
    }
  }

  /**
   * Update the database elements using the ID
   * If an element have no ID OR is NOT in the list, it will be append to the end with a new ID
   *
   * @param key
   * @param elements
   */
  public async updateElements(
    key: string,
    elements: StorageElement[]
  ): Promise<void> {
    let nextId = await this.getNextIdFor(key);
    try {
      const newArray: StorageElement[] = await this.get(key, []);
      for (const newElement of elements) {
        const currentElement = newArray.find(element => element.id === newElement.id);
        if (currentElement) {
          newElement.id = currentElement.id;
          Object.assign(currentElement, newElement);
        } else {
          newElement.id = (nextId++).toString();
          newArray.push(newElement);
        }
      }
      this.setNextIdFor(key, nextId);
      this.replace(key, newArray);
    } catch (ex) {
      console.error('Error adding to storage', ex);
      throw ex;
    }
  }

  public async removeElements(
    key: string,
    elementsToDelete: StorageElement[]
  ): Promise<void> {
    const currentElements: StorageElement[] = await this.get(key);
    const newElements = currentElements.filter((element) => {
      const index = elementsToDelete.findIndex(
        (remove) => remove.id === element.id
      );
      return index === -1;
    });
    return await this.replace(key, newElements);
  }

  private async setNextIdFor(key: string, id: number): Promise<void> {
    this.replace(`${key}_next_id`, id);
  }
}
