import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { VerifyHeaderBody, MsgResponse } from '/src/api/types.d';
import { useAppStore } from '/src/stores/appStore';

/**
 * @description AUTH REQUIRED TO RUN THIS REQUEST
 */
export async function postVerifyHeader(name: string) {
   const appStore = useAppStore();
   const [user] = appStore.userInformation;
   return await axios.post<MsgResponse>(
      ReqURL('/verify_header'),
      {
         name
      } as VerifyHeaderBody,
      {
         headers: {
            Authorization: user.auth_id || ''
         }
      }
   );
}
