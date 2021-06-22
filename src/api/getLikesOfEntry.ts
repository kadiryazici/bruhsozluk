import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { LeftContent } from '/src/api/types.d';

type LikesResponse = string[];
interface Params {
   header_id: string;
   entry_id: string;
}

export async function getLikesOfEntry(params: Params) {
   const url = ReqURL(`/likes/${params.header_id}/${params.entry_id}`);
   return await axios.get<LikesResponse>(url);
}
