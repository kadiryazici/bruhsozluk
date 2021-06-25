import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { LoginBody, MsgResponse } from '/src/api/types.d';

type GetHomeParams = {
   username: string;
   password: string;
};

export async function postSignup(params: GetHomeParams) {
   return await axios.post<MsgResponse>(ReqURL('/signup'), {
      ...params
   } as LoginBody);
}
