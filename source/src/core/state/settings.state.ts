import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { SettingsDatabaseService } from '../database/settings-database.service';
import { SettingModel } from '../models/setting.model';
import { StateFromDB, StateFromDBService } from './core/state-db.base';
import {
  StateableObservableProperty,
  StateableProperty
} from './core/state.decorators';

class State extends StateFromDB<SettingModel> {
}
class StateableState {
  [key: string]: BehaviorSubject<any>;
  // Global settings
  language: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // Items
  itemImageHeight: BehaviorSubject<number> = new BehaviorSubject<number>(125);
  itemImageWidth: BehaviorSubject<number> = new BehaviorSubject<number>(125);
}

@Injectable({
  providedIn: 'root',
})
export class SettingsStateService extends StateFromDBService<
  SettingModel,
  SettingsDatabaseService
> {
  // Global settings
  @StateableProperty() public language: string;

  // Items
  @StateableProperty() public itemImageHeight: number;
  @StateableProperty() public itemImageWidth: number;

  //
  // Observables
  //

  // Global settings
  @StateableObservableProperty('language')
  readonly language$: Observable<string>;

  // Items
  @StateableObservableProperty('itemImageHeight')
  readonly itemImageHeight$: Observable<number>;
  @StateableObservableProperty('itemImageWidth')
  readonly itemImageWidth$: Observable<number>;

  //
  // Methods
  //

  protected state = new State();
  protected stateableState = new StateableState();

  constructor(private settingsDatabase: SettingsDatabaseService) {
    super(settingsDatabase);
    this.itemsChangeListener();
  }

  persistChanges(): void {
    console.log('topoersist',this.mapStateElements())
    this.settingsDatabase.update(this.mapStateElements());
  }

  private itemsChangeListener(): void {
    this.elements$
      .pipe(
        distinctUntilChanged(),
        tap((settings) => {
          this.fillStateableState();
        })
      )
      .subscribe();
  }

  private fillStateableState(): void {
    const rawData = this.elements;
    if (!rawData) { return; }
    const state = this.stateableState;
    for (const element of rawData) {
      const key = element.id;
      if (state.hasOwnProperty(key)) {
        state[key].next(element.value);
      }
    }
  }

  private mapStateElements(): SettingModel[] {
    // All elements with the original value
    const settings: SettingModel[] = [];
    const state = this.stateableState;
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        const value = state[key];
        settings.push({
          id: key,
          value: value.getValue(),
        });
      }
    }
    return settings;
  }
}
