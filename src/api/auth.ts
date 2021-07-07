import { GetUserAuthID } from '/src/helpers/auth';
import { ReqURL } from '/src/api/config';
import type { LoginResponse, SignupBody } from '/src/api/types';
import axios from 'axios';

/**
 * Checks localstorage, if user signed in returns response, if not throws error
 */
export async function VerifyUser() {
   const id = GetUserAuthID();
   if (!id) throw new Error('Id bulunamadı');

   try {
      const res = await axios.get<LoginResponse>(ReqURL('/verify'));
      const { data } = res;
      return data;
   } catch (error) {
      throw error;
   }
}

export async function SignUp(param: SignupBody) {}
