import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { SearchBody, SearchResponse } from '/src/api/types.d';

export async function getSearch(query: string) {
   const url = ReqURL(`/search`);
   return await axios.post<SearchResponse[]>(url, {
      query
   } as SearchBody);
}
