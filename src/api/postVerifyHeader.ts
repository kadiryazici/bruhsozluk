import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { VerifyHeaderBody, MsgResponse } from '/src/api/types.d';

export async function postVerifyHeader(name: string) {
   return await axios.post<MsgResponse>(ReqURL('/verify_header'), {
      name
   } as VerifyHeaderBody);
}
