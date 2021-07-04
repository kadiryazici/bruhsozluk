import { GetUserAuthID } from '/src/helpers/auth';
import { ReqURL } from '/src/api/config';
import type { LoginResponse, SignupBody } from '/src/api/types';
import { usePromise } from 'vierone';
import axios from 'axios';

export async function VerifyUser() {
   const id = GetUserAuthID();
   if (!id) throw new Error('Id bulunamadı');

   try {
      const res = await axios.get<LoginResponse>(ReqURL('/verify'), {
         headers: {
            Authorization: id
         }
      });
      const { data } = res;
      return data;
   } catch (error) {
      throw error;
   }
}

export async function SignUp(param: SignupBody) {}
