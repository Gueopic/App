import { BehaviorSubject, of } from 'rxjs';

/* eslint-disable @typescript-eslint/naming-convention */

/**
 * Generate a sync getter and setter for a property in the state
 * The state must contain the property as Subject/BehaviorSubject with the same name
 *
 */
export function StateableProperty() {
  return (target: any, propertyName): any => {
    const prop = `${propertyName}`;

    return {
      get() {
        return this.stateableState[prop]?.value;
      },
      set(newValue) {
        this.stateableState[prop].next(newValue);
      },
    };
  };
}
export function StateableObservableProperty(stateName: string) {
  return (target: any, propertyName): any => {
    const prop = `_${propertyName}`;

    return {
      get() {
        if (!this[prop]) {
          this[prop] = this.stateableState[stateName]?.asObservable();
        }
        return this[prop];
      },
      set() {},
    };
  };
}
