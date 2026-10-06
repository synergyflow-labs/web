# Store Features (`src/store-features`)

This directory contains reusable custom extensions for `@ngrx/signals` (`signalStoreFeature`).

## What Belongs Here

Custom SignalStore extensions that add reusable state slices, computed signals, or lifecycle methods to any store in your application.

### Available Features

* **`withRequestStatus()`**: A flexible feature for tracking loading states, completions, and errors across named asynchronous actions (e.g. `'load'`, `'create'`, `'delete'`).

## Usage Example

```typescript
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { withRequestStatus, setPending, setFulfilled, setError } from '@StoreFeatures/with-request-status.feature';

export const UserStore = signalStore(
  withState({ users: [] }),
  withRequestStatus(),
  withMethods((store, userService = inject(UserService)) => ({
    async loadUsers() {
      patchState(store, setPending('loadUsers'));
      try {
        const users = await userService.getAll();
        patchState(store, { users }, setFulfilled('loadUsers'));
      } catch (err: any) {
        patchState(store, setError('loadUsers', err.message));
      }
    }
  }))
);
```

In your component:

```html
@if (userStore.isPending()('loadUsers')) {
  <p-progressSpinner />
}
@if (userStore.error()('loadUsers')) {
  <app-operation-failed>{{ userStore.error()('loadUsers') }}</app-operation-failed>
}
```
