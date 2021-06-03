import { useDB } from '@db';

export function addEntry2Left(headerID: string) {
   const db = useDB();

   // class HeaderInformation;

   db.get('leftContent');
}
