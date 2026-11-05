import 'dotenv/config';
import mongo from '@prisma/orm-mongo/runtime';
import { MongoClient } from 'mongodb';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

let client: ReturnType<typeof mongo<Contract>> | null = null;

export function getDbInstance() {
  if (!client) {
    const rawUrl = process.env.DATABASE_URL || '';
    const cleanUrl = rawUrl.replace(/["'\r\n]/g, '').trim();

    if (!cleanUrl) {
      throw new Error("DATABASE_URL bulunamadı!");
    }

    
    const nativeMongoClient = new MongoClient(cleanUrl);

   
    client = mongo<Contract>({
      contractJson,
      mongoClient: nativeMongoClient,
      dbName: 'ecom',
    });
  }

  return client;
}

export const db = new Proxy({} as ReturnType<typeof mongo<Contract>>, {
  get(_target, prop) {
    const instance = getDbInstance();
    return (instance as any)[prop];
  },
});