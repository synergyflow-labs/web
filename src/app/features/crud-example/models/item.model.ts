export interface Item {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  createdAt: string;
}

export type CreateItemDto = Omit<Item, 'id' | 'createdAt'>;
export type UpdateItemDto = Partial<CreateItemDto>;
