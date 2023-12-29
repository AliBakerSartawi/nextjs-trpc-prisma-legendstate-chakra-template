import { Store } from '../types/store.type';

export function SHOP_INITIAL_VAL(): Store['shop'] {
  return {
    id: '',
    name: '',
    slogan: '',
    description: '',
  };
}
