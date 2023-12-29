import cloneDeep from 'lodash.clonedeep';
import { useEffect, useRef } from 'react';
import { trpcClient } from 'src/client/trpc.client';
import { $actions } from 'src/store/actions';

export function GetShop() {
  // TODO make sure this is compatible with <Suspense>, it might not be cause it's not promise based, and because the app used to crash when the shop.get endpoint threw errors
  const [shop] = trpcClient.shop.get.useSuspenseQuery();
  const didPersistInStoreRef = useRef(false);

  useEffect(() => {
    if (shop && !didPersistInStoreRef.current) {
      didPersistInStoreRef.current = true;
      $actions.shop.set(cloneDeep(shop));
    }
  }, [shop]);

  return null;
}
