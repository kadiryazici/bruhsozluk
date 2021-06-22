import axios from 'axios';
import { ReqURL } from '/src/api/config';
import type { LeftContent } from '/src/api/types.d';

export async function getHome() {
   return await axios.get<LeftContent>(ReqURL('/left'));
}
