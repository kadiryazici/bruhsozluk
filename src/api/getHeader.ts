import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { getHeaderResponse } from '/src/api/types.d';

export async function getHeader(
   id: getHeaderResponse['id'],
   page?: getHeaderResponse['currentPage'] | string
) {
   return await axios.get<getHeaderResponse>(ReqURL('/header/' + id), {
      params: {
         page
      }
   });
}
