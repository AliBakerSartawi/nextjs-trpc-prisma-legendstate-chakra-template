import { Product, Shop } from '@prisma/client';
import { UUID } from 'src/utils/uuid.utils';

export interface Store {
  shop: ShopWithoutProducts;
  products: WithUUID<Product>[];
  modifications: {
    shop: ShopWithoutProducts;
    products: WithUUID<Product>[];
  };
}

export type SafeOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type WithUUID<T extends object> = T & { id: UUID };

export type ShopWithoutProducts = SafeOmit<Shop, 'products'>;
