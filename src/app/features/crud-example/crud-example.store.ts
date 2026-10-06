import { inject } from '@angular/core';

import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@StoreFeatures/with-request-status.feature';
import { firstValueFrom } from 'rxjs';

import { CrudExampleService } from './crud-example.service';
import { CreateItemDto, Item, UpdateItemDto } from './models/item.model';

export interface CrudState {
  items: Item[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
  selectedItem: Item | null;
}

const initialState: CrudState = {
  items: [],
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  searchTerm: '',
  selectedItem: null,
};

export const CrudStore = signalStore(
  withState(initialState),
  withRequestStatus(),
  withComputed(({ items, totalCount }) => ({
    hasItems: () => items().length > 0,
    totalItemsCount: () => totalCount(),
  })),
  withMethods((store, service = inject(CrudExampleService)) => ({
    async loadItems() {
      patchState(store, setPending('loadItems'));
      try {
        const result = await firstValueFrom(
          service.getItems({
            pageNumber: store.pageNumber(),
            pageSize: store.pageSize(),
            searchTerm: store.searchTerm(),
          }),
        );
        patchState(
          store,
          { items: result.items, totalCount: result.totalCount },
          setFulfilled('loadItems'),
        );
      } catch (err: any) {
        patchState(store, setError('loadItems', err.message || 'Failed to load items'));
      }
    },

    setSearchTerm(searchTerm: string) {
      patchState(store, { searchTerm, pageNumber: 1 });
      this.loadItems();
    },

    setPage(pageNumber: number) {
      patchState(store, { pageNumber });
      this.loadItems();
    },

    setSelectedItem(selectedItem: Item | null) {
      patchState(store, { selectedItem });
    },

    async createItem(dto: CreateItemDto) {
      patchState(store, setPending('saveItem'));
      try {
        await firstValueFrom(service.createItem(dto));
        patchState(store, setFulfilled('saveItem'));
        await this.loadItems();
        return true;
      } catch (err: any) {
        patchState(store, setError('saveItem', err.message || 'Failed to save item'));
        return false;
      }
    },

    async updateItem(id: string, dto: UpdateItemDto) {
      patchState(store, setPending('saveItem'));
      try {
        await firstValueFrom(service.updateItem(id, dto));
        patchState(store, setFulfilled('saveItem'));
        await this.loadItems();
        return true;
      } catch (err: any) {
        patchState(store, setError('saveItem', err.message || 'Failed to update item'));
        return false;
      }
    },

    async deleteItem(id: string) {
      patchState(store, setPending('deleteItem'));
      try {
        await firstValueFrom(service.deleteItem(id));
        patchState(store, setFulfilled('deleteItem'));
        await this.loadItems();
        return true;
      } catch (err: any) {
        patchState(store, setError('deleteItem', err.message || 'Failed to delete item'));
        return false;
      }
    },
  })),
);
