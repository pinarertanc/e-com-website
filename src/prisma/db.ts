import mongo from '@prisma/orm-mongo/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

const fallbackUrl = "mongodb+srv://pinarertanc_db_user:Q96xzGhhw3kem9iO@e-com.xxchbck.mongodb.net/hurc_db?retryWrites=true&w=majority&appName=e-com";

// Veritabanı bağlantı adresini garantiye alan yardımcı fonksiyon
function getMongoUrl(): string {
  const url = process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL || fallbackUrl;
  return url.trim();
}

// Global tekil (singleton) db istemcisi
let dbInstance: ReturnType<typeof mongo<Contract>> | null = null;

export function getDb() {
  if (!dbInstance) {
    dbInstance = mongo<Contract>({
      contractJson,
      url: getMongoUrl(),
    });
  }
  return dbInstance;
}

// Mevcut import'ları bozmamak için Proxy ile otomatik yönlendirme
export const db = new Proxy({} as ReturnType<typeof mongo<Contract>>, {
  get(_target, prop) {
    const instance = getDb();
    return (instance as any)[prop];
  },
});