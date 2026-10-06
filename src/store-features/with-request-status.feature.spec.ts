import { patchState, signalStore } from '@ngrx/signals';
import { describe, expect, it } from 'vitest';

import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from './with-request-status.feature';

describe('withRequestStatus SignalStore Feature', () => {
  const TestStore = signalStore(withRequestStatus());

  it('should initialize with empty statuses and isAnyPending as false', () => {
    const store = new TestStore();
    expect(store.statuses()).toEqual({});
    expect(store.isAnyPending()).toBe(false);
    expect(store.anyError()).toBeNull();
    expect(store.isPending()('load')).toBe(false);
  });

  it('should update status to pending with setPending', () => {
    const store = new TestStore();
    patchState(store, setPending('loadItems'));

    expect(store.isPending()('loadItems')).toBe(true);
    expect(store.isAnyPending()).toBe(true);
    expect(store.isFulfilled()('loadItems')).toBe(false);
  });

  it('should update status to fulfilled with setFulfilled', () => {
    const store = new TestStore();
    patchState(store, setFulfilled('loadItems'));

    expect(store.isPending()('loadItems')).toBe(false);
    expect(store.isFulfilled()('loadItems')).toBe(true);
    expect(store.isAnyPending()).toBe(false);
  });

  it('should update status to error with setError', () => {
    const store = new TestStore();
    patchState(store, setError('loadItems', 'Network failure'));

    expect(store.isPending()('loadItems')).toBe(false);
    expect(store.error()('loadItems')).toBe('Network failure');
    expect(store.anyError()).toBe('Network failure');
  });
});
