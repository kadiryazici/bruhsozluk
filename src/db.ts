import lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import path from 'path';
import { Database } from '@type';

const adapter = new FileAsync<Database>(
   path.resolve(__dirname, './database.json')
);
const db = lowdb(adapter);

export async function useDB() {
   return await db;
}
