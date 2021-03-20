import { useDB } from '@db';
import { defineMiddleware, responseError } from '@helpers/functions';
import { Msg } from '@messages';

export default defineMiddleware(async (req, res, next) => {
   const db = await useDB();
   const { authorization } = req.headers;

   if (authorization) {
      const user = db.get('users').find({ auth_id: authorization }).value();

      if (user) {
         next();
      } else {
         responseError(res, Msg.auth.error.msg);
      }
   } else {
      responseError(res, Msg.auth.error.msg);
   }
});
