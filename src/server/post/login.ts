import { useDB } from '@db';
import {
   defineAsyncHandler,
   responseError,
   trimLength,
} from '@helpers/functions';
import { LoginBody, LoginResponse } from '@type';
import { Msg } from '@messages';

export default defineAsyncHandler(async (req, res) => {
   const { username, password }: LoginBody = req.body;

   if (username && password) {
      const trimmedUsernameLength = trimLength(username);
      const trimmedPasswordLength = trimLength(password);

      if (trimmedUsernameLength > 0 && trimmedPasswordLength > 0) {
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
               Msg.login.error.pleaseInputUsernameAndPasswordCorrectly,
               404
            );
            return;
         }

         res.status(200).json(<LoginResponse>{
            username: user.username,
            auth_id: user.auth_id,
         });
      } else {
         responseError(
            res,
            Msg.login.error.pleaseInputUsernameAndPasswordCorrectly
         );
      }
   } else {
      responseError(
         res,
         Msg.login.error.pleaseInputUsernameAndPasswordCorrectly
      );
   }
});
