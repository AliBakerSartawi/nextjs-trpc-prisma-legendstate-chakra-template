import { observer } from '@legendapp/state/react';
import CustomEditable from 'src/components/CustomEditable';
import { $store } from 'src/store/store';

export const ShopSlogan = observer(() => {
  const slogan = $store.modifications.shop.slogan.get();

  return (
    <CustomEditable
      value={slogan ?? ''}
      label="slogan"
      onChange={(v) => $store.modifications.shop.slogan.set(v)}
    />
  );
});
