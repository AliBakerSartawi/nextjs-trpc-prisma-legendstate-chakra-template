import { ProductType, Shop } from '@prisma/client';
import cloneDeep from 'lodash.clonedeep';
import { UUID, newUUID } from 'src/utils/uuid.utils';
import { $store } from './store';
import { Store } from './types/store.type';

/**
 * $actions isn't reactive, but marked with $ so it's in the same style as $store.
 */
export const $actions = {
  shop: {
    set: (shop: Shop) => {
      const { products, ...restOfShop } = shop;
      const shopsWithUUIDs = products.map((p) => ({ ...p, id: newUUID() }));

      $store.shop.$ = cloneDeep(restOfShop);
      $store.products.$ = cloneDeep(shopsWithUUIDs);

      $store.modifications.shop.$ = cloneDeep(restOfShop);
      $store.modifications.products.$ = cloneDeep(shopsWithUUIDs);
    },
  },
  products: {
    add: (type: ProductType) => {
      $store.modifications.products.push({
        id: newUUID(),
        type: type,
        name: '',
        price: 0.0,
        description: '',
      });
    },

    changeType: (id: UUID, type: ProductType) => {
      const index = $store.modifications.products
        .get()
        ?.findIndex((a) => a?.id === id);
      if (index === -1 || typeof index !== 'number') return;
      $store.modifications.products[index]?.set({
        id: id,
        type: type,
        name: '',
        price: 0.0,
        description: '',
      });
    },

    setOne: <T extends Exclude<keyof Store['products'][number], 'id' | 'type'>>(
      id: UUID,
      key: T,
      value: Store['products'][number][T],
    ) => {
      const index = $store.modifications.products.get()?.findIndex((a) => {
        return a?.id === id;
      });
      if (index === -1 || typeof index !== 'number') return;

      $store.modifications.products[index]?.set((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
  },
};
