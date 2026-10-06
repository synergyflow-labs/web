import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';

import { ConfirmActionModal } from '@shared/components/confirm-action-modal/confirm-action-modal';
import { OperationFailed } from '@shared/components/operation-failed/operation-failed';
import { formatCurrency } from '@shared/utils/utilities';

import { TRANSLATION_TOKENS } from '@Core/config/language.config';

import { CrudStore } from './crud-example.store';
import { CreateItemDto, Item } from './models/item.model';
import { ItemFormModal } from './ui/item-form-modal/item-form-modal';

@Component({
  selector: 'app-crud-example',
  providers: [CrudStore],
  imports: [
    FormsModule,
    TableModule,
    Button,
    InputText,
    Tag,
    TranslatePipe,
    ItemFormModal,
    ConfirmActionModal,
    OperationFailed,
  ],
  template: `
    <div class="crud-page">
      <header class="page-header">
        <div>
          <h1 class="page-title">{{ tokens.ITEMS.TITLE | translate }}</h1>
          <p class="page-subtitle">{{ tokens.ITEMS.SUBTITLE | translate }}</p>
        </div>
        <p-button
          [label]="tokens.ITEMS.ADD_ITEM | translate"
          (onClick)="openCreateModal()"
          icon="pi pi-plus"
        />
      </header>

      @if (store.error()('loadItems'); as err) {
        <app-operation-failed [showRetry]="true" (retry)="store.loadItems()">
          {{ err }}
        </app-operation-failed>
      }

      <div class="toolbar">
        <div class="search-box">
          <input
            class="search-input"
            [(ngModel)]="searchQuery"
            [placeholder]="tokens.COMMON.SEARCH | translate"
            (ngModelChange)="onSearchChange($event)"
            pInputText
          />
        </div>
        <div class="summary">
          <span class="text-sm text-gray-500"> Total: {{ store.totalCount() }} items </span>
        </div>
      </div>

      <div class="table-card">
        <p-table
          [value]="store.items()"
          [loading]="store.isPending()('loadItems')"
          [paginator]="true"
          [rows]="store.pageSize()"
          [totalRecords]="store.totalCount()"
          [lazy]="true"
          [tableStyle]="{ 'min-width': '50rem' }"
          (onPage)="onPageChange($event)"
        >
          <ng-template #header>
            <tr>
              <th>{{ tokens.ITEMS.NAME | translate }}</th>
              <th>{{ tokens.ITEMS.CATEGORY | translate }}</th>
              <th>{{ tokens.ITEMS.PRICE | translate }}</th>
              <th>{{ tokens.ITEMS.STOCK | translate }}</th>
              <th>{{ tokens.COMMON.ACTIONS | translate }}</th>
            </tr>
          </ng-template>

          <ng-template #body let-item>
            <tr>
              <td>
                <strong>{{ item.name }}</strong>
                @if (item.description) {
                  <p class="text-xs text-gray-400 mt-1">{{ item.description }}</p>
                }
              </td>
              <td>
                <p-tag [value]="item.category" severity="secondary" />
              </td>
              <td>{{ formatPrice(item.price) }}</td>
              <td>
                <p-tag
                  [value]="item.stock > 0 ? item.stock + ' in stock' : 'Out of stock'"
                  [severity]="item.stock > 10 ? 'success' : item.stock > 0 ? 'warn' : 'danger'"
                />
              </td>
              <td>
                <div class="row-actions">
                  <p-button
                    [rounded]="true"
                    [text]="true"
                    [attr.aria-label]="tokens.COMMON.EDIT | translate"
                    (onClick)="openEditModal(item)"
                    icon="pi pi-pencil"
                    severity="secondary"
                  />
                  <p-button
                    [rounded]="true"
                    [text]="true"
                    [attr.aria-label]="tokens.COMMON.DELETE | translate"
                    (onClick)="confirmDelete(item)"
                    icon="pi pi-trash"
                    severity="danger"
                  />
                </div>
              </td>
            </tr>
          </ng-template>

          <ng-template #emptymessage>
            <tr>
              <td colspan="5">
                <div class="empty-state">
                  <i class="pi pi-inbox empty-icon" aria-hidden="true"></i>
                  <p>{{ tokens.COMMON.NO_DATA | translate }}</p>
                </div>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>

      <!-- Create / Edit Dialog -->
      <app-item-form-modal
        [visible]="isFormModalVisible()"
        [item]="selectedItem()"
        [isLoading]="store.isPending()('saveItem')"
        (save)="onSaveItem($event)"
        (formCancelled)="closeFormModal()"
      />

      <!-- Delete Confirmation Dialog -->
      @if (itemToDelete(); as item) {
        <app-confirm-action-modal
          [title]="tokens.ITEMS.DELETE_ITEM | translate"
          [warningMessage]="tokens.ITEMS.DELETE_CONFIRMATION | translate"
          [confirmationPhrase]="item.name"
          (confirmed)="onDeleteConfirmed()"
          (cancelled)="itemToDelete.set(null)"
          variant="danger"
        />
      }
    </div>
  `,
  styleUrl: './crud-example.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudExample implements OnInit {
  protected readonly store = inject(CrudStore);
  protected readonly tokens = TRANSLATION_TOKENS;

  protected searchQuery = '';
  protected readonly isFormModalVisible = signal(false);
  protected readonly selectedItem = signal<Item | null>(null);
  protected readonly itemToDelete = signal<Item | null>(null);

  ngOnInit(): void {
    this.store.loadItems();
  }

  protected formatPrice(price: number): string {
    return formatCurrency(price);
  }

  protected onSearchChange(term: string): void {
    this.store.setSearchTerm(term);
  }

  protected onPageChange(event: any): void {
    const page = Math.floor(event.first / event.rows) + 1;
    this.store.setPage(page);
  }

  protected openCreateModal(): void {
    this.selectedItem.set(null);
    this.isFormModalVisible.set(true);
  }

  protected openEditModal(item: Item): void {
    this.selectedItem.set(item);
    this.isFormModalVisible.set(true);
  }

  protected closeFormModal(): void {
    this.isFormModalVisible.set(false);
    this.selectedItem.set(null);
  }

  protected async onSaveItem(dto: CreateItemDto): Promise<void> {
    const item = this.selectedItem();
    const success = item
      ? await this.store.updateItem(item.id, dto)
      : await this.store.createItem(dto);
    if (success) {
      this.closeFormModal();
    }
  }

  protected confirmDelete(item: Item): void {
    this.itemToDelete.set(item);
  }

  protected async onDeleteConfirmed(): Promise<void> {
    const item = this.itemToDelete();
    if (item) {
      await this.store.deleteItem(item.id);
      this.itemToDelete.set(null);
    }
  }
}
