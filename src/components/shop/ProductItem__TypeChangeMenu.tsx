import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { observer } from '@legendapp/state/react';
import { ProductType } from '@prisma/client';
import { $actions } from 'src/store/actions';
import { $Prop__Product } from 'src/store/store';

export const ProductItem__TypeChangeMenu = observer(
  ({ product }: { product: $Prop__Product }) => {
    const handleTypeChange = (type: ProductType) => {
      product?.id && $actions.products.changeType(product.id, type);
    };

    return (
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          alignSelf="start" // to prevent it from being stretched full-width inside flex containers
        >
          {product?.type}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleTypeChange('DIGITAL')}>
            Digital
          </MenuItem>
          <MenuItem onClick={() => handleTypeChange('PHYSICAL')}>
            Physical
          </MenuItem>
        </MenuList>
      </Menu>
    );
  },
);
