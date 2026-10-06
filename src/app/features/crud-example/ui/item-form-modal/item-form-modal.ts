import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';

import { FieldError } from '@shared/components/field-error/field-error';
import { CustomValidators } from '@shared/validators/custom-validators';

import { TRANSLATION_TOKENS } from '@Core/config/language.config';

import { CreateItemDto, Item } from '../../models/item.model';

@Component({
  selector: 'app-item-form-modal',
  imports: [
    ReactiveFormsModule,
    Dialog,
    InputText,
    InputNumber,
    Textarea,
    Button,
    TranslatePipe,
    FieldError,
  ],
  template: `
    <p-dialog
      [visible]="visible()"
      [modal]="true"
      [draggable]="false"
      [resizable]="false"
      [closable]="true"
      [header]="
        isEditMode() ? (tokens.ITEMS.EDIT_ITEM | translate) : (tokens.ITEMS.ADD_ITEM | translate)
      "
      [style]="{ width: '450px' }"
      (onHide)="closeModal()"
    >
      <form class="item-form" [formGroup]="itemForm" (ngSubmit)="onSubmit()">
        <div class="form-field">
          <label for="item-name">{{ tokens.ITEMS.NAME | translate }} *</label>
          <input
            id="item-name"
            pInputText
            formControlName="name"
            placeholder="e.g. Wireless Mouse"
          />
          @if (nameControl.invalid && (nameControl.dirty || nameControl.touched)) {
            <app-field-error id="item-name-error">
              {{ tokens.ITEMS.NAME_REQUIRED | translate }}
            </app-field-error>
          }
        </div>

        <div class="form-field">
          <label for="item-category">{{ tokens.ITEMS.CATEGORY | translate }} *</label>
          <input
            id="item-category"
            pInputText
            formControlName="category"
            placeholder="e.g. Peripherals"
          />
          @if (categoryControl.invalid && (categoryControl.dirty || categoryControl.touched)) {
            <app-field-error id="item-category-error">
              {{ tokens.ITEMS.CATEGORY_REQUIRED | translate }}
            </app-field-error>
          }
        </div>

        <div class="form-row">
          <div class="form-field">
            <label for="item-price">{{ tokens.ITEMS.PRICE | translate }} *</label>
            <p-inputnumber
              id="item-price"
              formControlName="price"
              mode="currency"
              currency="USD"
              locale="en-US"
              styleClass="w-full"
            />
          </div>

          <div class="form-field">
            <label for="item-stock">{{ tokens.ITEMS.STOCK | translate }} *</label>
            <p-inputnumber id="item-stock" [min]="0" formControlName="stock" styleClass="w-full" />
          </div>
        </div>

        <div class="form-field">
          <label for="item-desc">{{ tokens.ITEMS.DESCRIPTION | translate }}</label>
          <textarea
            id="item-desc"
            pTextarea
            formControlName="description"
            rows="3"
            placeholder="Optional item details..."
          ></textarea>
        </div>
      </form>

      <ng-template #footer>
        <div class="modal-actions">
          <p-button
            [label]="tokens.COMMON.CANCEL | translate"
            [text]="true"
            (onClick)="closeModal()"
            severity="secondary"
            type="button"
          />
          <p-button
            [label]="tokens.COMMON.SAVE | translate"
            [disabled]="itemForm.invalid"
            [loading]="isLoading()"
            (onClick)="onSubmit()"
            type="button"
          />
        </div>
      </ng-template>
    </p-dialog>
  `,
  styleUrl: './item-form-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemFormModal {
  protected readonly tokens = TRANSLATION_TOKENS;

  readonly visible = input.required<boolean>();
  readonly item = input<Item | null>(null);
  readonly isLoading = input<boolean>(false);

  readonly save = output<CreateItemDto>();
  readonly formCancelled = output<void>();

  protected isEditMode = signal(false);

  protected readonly itemForm = new FormGroup({
    name: new FormControl('', [Validators.required, CustomValidators.trimMinLength(2)]),
    category: new FormControl('', [Validators.required, CustomValidators.trimMinLength(2)]),
    price: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    stock: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    description: new FormControl(''),
  });

  constructor() {
    effect(() => {
      const current = this.item();
      if (current) {
        this.isEditMode.set(true);
        this.itemForm.patchValue({
          name: current.name,
          category: current.category,
          price: current.price,
          stock: current.stock,
          description: current.description ?? '',
        });
      } else {
        this.isEditMode.set(false);
        this.itemForm.reset({ price: 0, stock: 0 });
      }
    });
  }

  protected get nameControl() {
    return this.itemForm.controls.name;
  }

  protected get categoryControl() {
    return this.itemForm.controls.category;
  }

  protected closeModal(): void {
    this.itemForm.reset();
    this.formCancelled.emit();
  }

  protected onSubmit(): void {
    if (this.itemForm.invalid) return;
    const formVal = this.itemForm.getRawValue();
    this.save.emit({
      name: formVal.name ?? '',
      category: formVal.category ?? '',
      price: formVal.price ?? 0,
      stock: formVal.stock ?? 0,
      description: formVal.description ?? '',
    });
  }
}
