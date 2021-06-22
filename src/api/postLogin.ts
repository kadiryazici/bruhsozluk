import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { LoginBody, LoginResponse } from '/src/api/types.d';

type GetHomeParams = {
   username: string;
   password: string;
};

export async function postLogin(params: GetHomeParams) {
   return await axios.post<LoginResponse>(ReqURL('/login'), {
      ...params
   } as LoginBody);
}
