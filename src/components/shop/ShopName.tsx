import { observer } from '@legendapp/state/react';
import CustomEditable from 'src/components/CustomEditable';
import { $store } from 'src/store/store';

export const ShopName = observer(() => {
  const name = $store.modifications.shop.name.get();

  return (
    <CustomEditable
      value={name ?? ''}
      label="Shop name"
      fontSize="xxx-large"
      aria-required
      onChange={(v) => $store.modifications.shop.name.set(v)}
    />
  );
});
