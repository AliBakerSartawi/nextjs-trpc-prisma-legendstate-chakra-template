import { Shop, ProductType } from '@prisma/client';
import { z } from 'zod';

export const upsertStoreSchema: z.ZodType<Shop> = z.object({
  id: z.string(),
  name: z.string().min(1),
  slogan: z.string().nullable(),
  description: z.string().nullable(),
  products: z.array(
    z.object({
      type: z.nativeEnum(ProductType),
      name: z.string(),
      price: z.number(),
      description: z.string().nullable(),
    }),
  ),
});
export type UpsertShopSchema = z.infer<typeof upsertStoreSchema>;
