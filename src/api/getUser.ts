import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { GetUserResponse } from '/src/api/types.d';
import { fixURLUsername } from '/src/helpers/app';

export async function getUser(username: string, page = 1) {
   username = fixURLUsername(username);
   const url = ReqURL(`/user/${username}?page=${page}`);
   return await axios.get<GetUserResponse>(url);
}
