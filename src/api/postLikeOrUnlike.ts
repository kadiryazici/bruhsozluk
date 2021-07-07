import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { MsgResponse, PostLikeBody } from '/src/api/types.d';

/**
 * * To like an entry, requires authentication
 */
export async function postLikeEntry(params: PostLikeBody) {
   return await axios.post<MsgResponse>(ReqURL('/like'), {
      ...params
   } as PostLikeBody);
}

/**
 * * To unlike an entry, requires authentication
 */
export async function postUnLikeEntry(params: PostLikeBody) {
   return await axios.post<MsgResponse>(ReqURL('/unlike'), {
      ...params
   } as PostLikeBody);
}
