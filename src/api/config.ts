const apiAdress = 'http://localhost:3000';

/**
 * @returns Requrl (without /) + given parameter.
 */
export function ReqURL(requestURL: string) {
   return `${apiAdress}${requestURL}`;
}
