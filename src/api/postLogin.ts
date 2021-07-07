import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { LoginBody, LoginResponse } from '/src/api/types.d';

export async function postLogin(params: LoginBody) {
   return await axios.post<LoginResponse>(ReqURL('/login'), params);
}
