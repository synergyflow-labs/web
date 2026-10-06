import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { delay, Observable, of } from 'rxjs';

import { PaginatedList, PaginatedQuery } from '@shared/models/pagination.model';

import { APP_SETTINGS } from '@Core/config/app.settings';

import { CreateItemDto, Item, UpdateItemDto } from './models/item.model';

@Injectable({
  providedIn: 'root',
})
export class CrudExampleService {
  private readonly http = inject(HttpClient);
  private readonly appSettings = inject(APP_SETTINGS);

  private mockItems: Item[] = [
    {
      id: 'itm-1',
      name: 'Wireless Noise-Canceling Headphones',
      category: 'Electronics',
      price: 299.99,
      stock: 45,
      description: 'Premium wireless headphones with active noise cancellation.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'itm-2',
      name: 'Ergonomic Mechanical Keyboard',
      category: 'Peripherals',
      price: 159.5,
      stock: 28,
      description: 'Custom mechanical keyboard with quiet tactile switches.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'itm-3',
      name: 'Ultra-Wide 4K IPS Monitor',
      category: 'Electronics',
      price: 649.0,
      stock: 12,
      description: '34-inch ultra-wide curved productivity monitor.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'itm-4',
      name: 'Anodized Aluminum Laptop Stand',
      category: 'Accessories',
      price: 49.99,
      stock: 80,
      description: 'Adjustable ergonomic laptop riser with cable management.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'itm-5',
      name: 'USB-C Multi-Port Hub (10-in-1)',
      category: 'Accessories',
      price: 79.99,
      stock: 65,
      description: 'Compact docking hub with HDMI, Ethernet, and card reader.',
      createdAt: new Date().toISOString(),
    },
  ];

  getItems(query: PaginatedQuery): Observable<PaginatedList<Item>> {
    if (this.appSettings.useMockAuth) {
      let filtered = [...this.mockItems];
      if (query.searchTerm) {
        const term = query.searchTerm.toLowerCase();
        filtered = filtered.filter(
          (i) => i.name.toLowerCase().includes(term) || i.category.toLowerCase().includes(term),
        );
      }

      const totalCount = filtered.length;
      const startIndex = (query.pageNumber - 1) * query.pageSize;
      const paginated = filtered.slice(startIndex, startIndex + query.pageSize);

      return of({
        items: paginated,
        totalCount,
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
        totalPages: Math.ceil(totalCount / query.pageSize),
      }).pipe(delay(250));
    }

    return this.http.get<PaginatedList<Item>>(`${this.appSettings.apiBaseUrl}/items`, {
      params: {
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
        ...(query.searchTerm ? { searchTerm: query.searchTerm } : {}),
      },
    });
  }

  createItem(dto: CreateItemDto): Observable<Item> {
    if (this.appSettings.useMockAuth) {
      const newItem: Item = {
        ...dto,
        id: 'itm-' + (this.mockItems.length + 1),
        createdAt: new Date().toISOString(),
      };
      this.mockItems = [newItem, ...this.mockItems];
      return of(newItem).pipe(delay(200));
    }

    return this.http.post<Item>(`${this.appSettings.apiBaseUrl}/items`, dto);
  }

  updateItem(id: string, dto: UpdateItemDto): Observable<Item> {
    if (this.appSettings.useMockAuth) {
      this.mockItems = this.mockItems.map((item) => (item.id === id ? { ...item, ...dto } : item));
      const updated = this.mockItems.find((i) => i.id === id)!;
      return of(updated).pipe(delay(200));
    }

    return this.http.put<Item>(`${this.appSettings.apiBaseUrl}/items/${id}`, dto);
  }

  deleteItem(id: string): Observable<void> {
    if (this.appSettings.useMockAuth) {
      this.mockItems = this.mockItems.filter((i) => i.id !== id);
      return of(undefined).pipe(delay(200));
    }

    return this.http.delete<void>(`${this.appSettings.apiBaseUrl}/items/${id}`);
  }
}
