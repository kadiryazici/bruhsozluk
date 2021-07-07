import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { getHeaderResponse } from '/src/api/types.d';

interface Params {
   id: getHeaderResponse['id'];
   page?: getHeaderResponse['currentPage'] | string;
}

export async function getHeader(id: Params['id'], page: Params['page']) {
   return await axios.get<getHeaderResponse>(ReqURL('/header/' + id), {
      params: {
         page
      }
   });
}
