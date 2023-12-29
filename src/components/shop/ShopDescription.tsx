import { observer } from '@legendapp/state/react';
import CustomEditable from 'src/components/CustomEditable';
import { $store } from 'src/store/store';

export const ShopDescription = observer(() => {
  const description = $store.modifications.shop.description.get();

  return (
    <CustomEditable
      value={description ?? ''}
      label="description"
      isTextarea
      onChange={(v) => $store.modifications.shop.description.set(v)}
    />
  );
});
