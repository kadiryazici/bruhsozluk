import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { AddHeaderBody, AddHeaderResponse } from '/src/api/types.d';
import { useAppStore } from '/src/stores/appStore';

/** @description AUTH REQUIRED TO RUN THIS REQUEST */
export async function postCreateHeader(name: string, entryBody: string) {
   return await axios.post<AddHeaderResponse>(ReqURL('/add_header'), {
      name,
      entryBody
   } as AddHeaderBody);
}
