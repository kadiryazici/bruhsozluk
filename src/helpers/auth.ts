import axios from 'axios';
import { usePromise } from 'vierone';
import { ReqURL } from '../api/config';
import type { LoginResponse } from '/src/api/types';

const key = 'auth_id';
export function SetUserAuthID(auth_id: string) {
   return window.localStorage.setItem(key, auth_id);
}
export function GetUserAuthID() {
   return window.localStorage.getItem(key);
}

export async function VerifyUser() {
   const id = GetUserAuthID();
   if (!id) throw new Error('Id bulunamadı');

   const [res, err] = await usePromise(
      axios.get<LoginResponse>(ReqURL('/verify'), {
         headers: {
            Authorization: id
         }
      })
   );

   if (err) {
      throw err;
   }

   const { data } = res!;
   return data;
}
