import { App } from '@tinyhttp/app';

import { responseError } from '@helpers/functions';
import { Msg } from '@messages';

export const app = new App({
   // sunucu temelli bir hata olduğunda, bu hatayı ben devralıyorum.
   onError: (err, req, res) => {
      responseError(res, req.ip || Msg.app.error.msg);
   },

   noMatchHandler: (req, res) => {
      responseError(res, req.ip || Msg.app.error.msg);
   },

   settings: {
      xPoweredBy: false
   }
});

type P<T extends (...args: any) => any> = Parameters<T>;

export const Use = (...p: P<typeof app.use>) => app.use(...p);
export const Get = (...p: P<typeof app.get>) => app.get(...p);
export const Post = (...p: P<typeof app.post>) => app.post(...p);
export const Delete = (...p: P<typeof app.delete>) => app.delete(...p);
export const Listen = (...p: P<typeof app.listen>) => app.listen(...p);
