import { useDB } from '@db';
import { defineMiddleware, responseError } from '@helpers/functions';

export default defineMiddleware(async (req, res, next) => {
   const db = useDB();
   const { authorization } = req.headers;

   if (authorization) {
      const user = db.get('users').find({ auth_id: authorization }).value();
      if (user) {
         Object.defineProperty(res.locals, 'auth', {
            value: user
         });
         next();
         return;
      }
   }
   next();
   return;
});
