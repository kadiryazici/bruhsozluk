import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { getHeaderResponse } from '/src/api/types.d';
import { GetUserAuthID } from '/src/helpers/auth';
import { useAppStore } from '/src/stores/appStore';

export async function getHeader(
   id: getHeaderResponse['id'],
   page?: getHeaderResponse['currentPage'] | string
) {
   return await axios.get<getHeaderResponse>(ReqURL('/header/' + id), {
      params: {
         page
      },
      headers: {
         Authorization: GetUserAuthID()
      }
   });
}
