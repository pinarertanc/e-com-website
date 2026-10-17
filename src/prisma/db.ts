import mongo from '@prisma/orm-mongo/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

// İhtiyaç duyulduğunda (ilk DB sorgusunda) çalışır
export function getDb() {
  const url = process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL .env dosyasında bulunamadı!");

  return mongo<Contract>({ contractJson, url });
}

// Projede 'db.user.findMany()' şeklinde rahatça kullanmak için Proxy
export const db = new Proxy({} as ReturnType<typeof mongo<Contract>>, {
  get(_target, prop) {
    return (getDb() as any)[prop];
  },
});