import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { AddEntryBody, AddEntryResponse } from '/src/api/types.d';
import { useAppStore } from '/src/stores/appStore';

export async function postAddEntry(body: string, header_id: string) {
   const appStore = useAppStore();
   const [user] = appStore.userInformation;

   const url = ReqURL(`/add_entry`);
   return await axios.post<AddEntryResponse>(
      url,
      {
         body,
         header_id
      } as AddEntryBody,
      {
         headers: {
            Authorization: user.auth_id
         }
      }
   );
}
