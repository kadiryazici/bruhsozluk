import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { SignupBody, MsgResponse } from '/src/api/types.d';

export async function postSignup(params: SignupBody) {
   return await axios.post<MsgResponse>(ReqURL('/signup'), params);
}
