import {
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { ProductType } from '@prisma/client';
import { useTheme } from 'src/providers/CustomChakraProvider';
import { $actions } from 'src/store/actions';

export function AddProduct() {
  const { colors } = useTheme();

  const handleAddProduct = async (type: ProductType) => {
    $actions.products.add(type);

    // Wait a little until the new product is added to the list to get the proper scrollHeight
    await new Promise(() =>
      setTimeout(() => {
        window.scrollTo({
          behavior: 'smooth',
          top: document.body.scrollHeight,
        });
      }, 200),
    );
  };

  return (
    <Center
      p={4}
      borderRadius={18}
      border="1px"
      borderColor={colors.whiteAlpha[300]}
      bgColor={colors.gray[800]}
      opacity={0.98}
    >
      <Menu>
        <MenuButton as={Button} flex={1}>
          Add Product
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleAddProduct('DIGITAL')}>
            Digital
          </MenuItem>
          <MenuItem onClick={() => handleAddProduct('PHYSICAL')}>
            Physical
          </MenuItem>
        </MenuList>
      </Menu>
    </Center>
  );
}
