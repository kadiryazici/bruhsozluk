import { App } from '@tinyhttp/app';

import { responseError } from '@helpers/functions';
import { Msg } from '@messages';

export const app = new App({
   // sunucu temelli bir hata olduğunda, bu hatayı ben devralıyorum.
   onError: (err, req, res) => responseError(res, req.ip || Msg.app.error.msg),
   noMatchHandler: (req, res) =>
      responseError(res, req.ip || Msg.app.error.msg),
   settings: {
      xPoweredBy: true
   }
});

export const Use = (...params: Parameters<typeof app.use>) =>
   app.use(...params);
export const Get = (...params: Parameters<typeof app.get>) =>
   app.get(...params);
export const Post = (...params: Parameters<typeof app.post>) =>
   app.post(...params);
export const Delete = (...params: Parameters<typeof app.delete>) =>
   app.delete(...params);
export const Listen = (...params: Parameters<typeof app.listen>) =>
   app.listen(...params);
