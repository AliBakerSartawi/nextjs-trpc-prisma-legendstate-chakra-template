import { Button, Center, Collapse } from '@chakra-ui/react';
import { observer } from '@legendapp/state/react';
import fastDeepEqual from 'fast-deep-equal';
import { trpcClient } from 'src/client/trpc.client';
import { useTheme } from 'src/providers/CustomChakraProvider';
import { UpsertShopSchema } from 'src/schema/shop.schema';
import { $actions } from 'src/store/actions';
import { $store } from 'src/store/store';

export const SaveShop = observer(() => {
  const { colors } = useTheme();

  const shop = $store.shop.get();
  const products = $store.products.get();
  const modifiedShop = $store.modifications.shop.get();
  const modifiedAssets = $store.modifications.products.get();

  const hasChanges =
    !fastDeepEqual(shop, modifiedShop) ||
    !fastDeepEqual(products, modifiedAssets);

  const canSave = !!modifiedShop?.name;

  const saveMutation = trpcClient.shop.upsert.useMutation();

  const handleSave = async () => {
    if (!canSave) return;

    const input: UpsertShopSchema | null = getUpsertShopInput();
    if (!input) {
      console.error('Invalid upsert shop input');
      return;
    }

    await saveMutation
      .mutateAsync(input)
      .then((shop) => shop && $actions.shop.set(shop))
      .catch(console.error);
  };

  return (
    <Collapse in={hasChanges} animateOpacity>
      <Center
        p={4}
        mt={4}
        borderRadius={18}
        border="1px"
        borderColor={colors.whiteAlpha[300]}
        bgColor={colors.gray[800]}
        opacity={0.98}
      >
        <Button
          flex={1}
          isDisabled={!canSave}
          isLoading={saveMutation.isLoading}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Center>
    </Collapse>
  );
});

function getUpsertShopInput(): UpsertShopSchema | null {
  const shop = $store.modifications.shop.get();
  if (!shop?.name) return null;

  const products = $store.modifications.products.get();
  const shopsWithoutUUIDs: UpsertShopSchema['products'] =
    products
      ?.map((product) => {
        if (!product?.type) return null;
        const _shop: UpsertShopSchema['products'][number] = {
          type: product.type,
          name: product.name || '',
          price: product.price || 0.0,
          description: product.description || null,
        };
        return _shop;
      })
      ?.filter(Boolean) || [];

  const input: UpsertShopSchema = {
    id: shop.id || '',
    name: shop.name,
    slogan: shop.slogan || null,
    description: shop.description || null,
    products: shopsWithoutUUIDs,
  };

  return input;
}
