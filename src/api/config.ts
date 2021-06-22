const apiAdress = 'http://localhost:3000';

export function ReqURL(requestURL: string) {
   return `${apiAdress}${requestURL}`;
}
