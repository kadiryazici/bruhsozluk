import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';
import { Database } from '@type';

const adapter = new FileSync<Database>(
   path.resolve(__dirname, './database.json')
);
const db = lowdb(adapter);

export function useDB() {
   return db;
}
