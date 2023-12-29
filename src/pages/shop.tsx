import { Suspense } from 'react';
import { requireAuth } from 'src/utils/auth.utils';
import { ShopPageMain } from '../components/shop/ShopPageMain';

export default function ShopPage() {
  return (
    <Suspense>
      <ShopPageMain />
    </Suspense>
  );
}

export const getServerSideProps = requireAuth(async (_ctx) => {
  return { props: {} };
});
