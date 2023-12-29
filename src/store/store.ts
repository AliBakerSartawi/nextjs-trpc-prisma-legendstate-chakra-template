import { observable } from '@legendapp/state';
import { enableReactTracking } from '@legendapp/state/config/enableReactTracking';
import { enableDirectAccess } from '@legendapp/state/config/enableDirectAccess';
import { Store } from './types/store.type';
import { SHOP_INITIAL_VAL } from './config/initial-values';

enableDirectAccess();
enableReactTracking({ auto: true });

export const $store = observable<Store>({
  shop: SHOP_INITIAL_VAL(),
  products: [],
  modifications: {
    shop: SHOP_INITIAL_VAL(),
    products: [],
  },
} satisfies Store);

export type $Store = typeof $store;

export type $Prop__Products = ReturnType<$Store['products']['get']>;
export type $Prop__Product = NonNullable<$Prop__Products>[number];
