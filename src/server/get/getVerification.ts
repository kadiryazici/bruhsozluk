import { useDB } from '@db';
import {
   defineSyncHandler,
   responseError,
   responseSuccess
} from '@helpers/functions';
import { Msg } from '@messages';

// GET /verify
export default defineSyncHandler((req, res) => {
   const { authorization } = req.headers;
   if (authorization) {
      const user = useDB()
         .get('users')
         .find({ auth_id: authorization })
         .value();
      if (user) {
         res.json({
            auth_id: user.auth_id,
            isAdmin: user.isAdmin,
            username: user.username
         });
      } else {
         responseError(res, Msg.get_verification.error.msg);
      }
   } else {
      responseError(res, Msg.get_verification.error.msg);
   }
});
