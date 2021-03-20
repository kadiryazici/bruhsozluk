import { useDB } from '@db';
import {
   defineAsyncHandler,
   responseError,
   trimLength,
} from '@helpers/functions';
import { LoginBody, LoginResponse } from '@type';

const ERROR = {
   pleaseInputUsernameAndPasswordCorrectly:
      'Please input username and password correctly',
};

export default defineAsyncHandler(async (req, res) => {
   const { username, password }: LoginBody = req.body;

   if (username && password) {
      if (trimLength(username) > 0 && trimLength(password) > 0) {
         const db = await useDB();
         const user = db
            .get('users')
            .find({
               username,
               password,
            })
            .value();

         if (!user) {
            responseError(
               res,
               ERROR.pleaseInputUsernameAndPasswordCorrectly,
               404
            );
            return;
         }

         res.status(200).json(<LoginResponse>{
            username: user.username,
            auth_id: user.auth_id,
         });
      } else {
         responseError(res, ERROR.pleaseInputUsernameAndPasswordCorrectly);
      }
   } else {
      responseError(res, ERROR.pleaseInputUsernameAndPasswordCorrectly);
   }
});
