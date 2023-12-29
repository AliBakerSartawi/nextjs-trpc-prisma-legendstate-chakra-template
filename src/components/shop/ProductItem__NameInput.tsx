import { observer } from '@legendapp/state/react';
import { $actions } from 'src/store/actions';
import { $Prop__Product } from 'src/store/store';
import CustomEditable from '../CustomEditable';

export const ProductItem__NameInput = observer(
  ({ product }: { product: $Prop__Product }) => {
    const handleChange = (v: string) => {
      product?.id && $actions.products.setOne(product.id, 'name', v);
    };

    return (
      <CustomEditable
        value={product?.name ?? ''}
        placeholder="name"
        fontSize="medium"
        aria-required
        onChange={handleChange}
      />
    );
  },
);
