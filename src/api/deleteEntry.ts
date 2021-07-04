import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { Entry, Header, MsgResponse } from '/src/api/types.d';
import { useAppStore } from '/src/stores/appStore';

interface Params {
   entry_id: Entry['id'];
   header_id: Header['id'];
}

export async function deleteEntry(params: Params) {
   const appStore = useAppStore();
   const [user] = appStore.userInformation;
   const { header_id, entry_id } = params;
   const url = ReqURL(`/delete_entry/${header_id}/${entry_id}`);
   return await axios.delete<MsgResponse>(url, {
      headers: {
         Authorization: user.auth_id
      }
   });
}
