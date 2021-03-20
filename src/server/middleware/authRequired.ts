import { useDB } from '@db';
import { defineMiddleware, responseError } from '@helpers/functions';

const msg = 'Kullanıcı kimliği hatası.';

export default defineMiddleware(async (req, res, next) => {
   const db = await useDB();
   const { authorization } = req.headers;

   if (authorization) {
      const user = db.get('users').find({ auth_id: authorization }).value();

      if (user) {
         next();
      } else {
         responseError(res, msg);
      }
   } else {
      responseError(res, msg);
   }
});
