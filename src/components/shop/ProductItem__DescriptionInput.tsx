import { observer } from '@legendapp/state/react';
import { $Prop__Product } from 'src/store/store';
import CustomEditable from '../CustomEditable';
import { $actions } from 'src/store/actions';

export const ProductItem__DescriptionInput = observer(
  ({ product }: { product: $Prop__Product }) => {
    const handleChange = (v: string) => {
      product?.id && $actions.products.setOne(product.id, 'description', v);
    };

    return (
      <CustomEditable
        value={product?.description ?? ''}
        placeholder="description"
        fontSize="medium"
        isTextarea
        onChange={handleChange}
      />
    );
  },
);
