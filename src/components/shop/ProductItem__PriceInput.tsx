import { observer } from '@legendapp/state/react';
import { $Prop__Product } from 'src/store/store';
import { $actions } from 'src/store/actions';
import CustomEditable from '../CustomEditable';

export const ProductItem__PriceInput = observer(
  ({ product }: { product: $Prop__Product }) => {
    const handleChange = (v: string) => {
      const vAsNum = Number(v);
      if (typeof vAsNum !== 'number' || isNaN(vAsNum)) return;
      product?.id && $actions.products.setOne(product.id, 'price', vAsNum);
    };

    return (
      <CustomEditable
        value={product?.price?.toString() ?? ''}
        inputMode="decimal"
        placeholder="price"
        fontSize="medium"
        aria-required
        onChange={handleChange}
      />
    );
  },
);
