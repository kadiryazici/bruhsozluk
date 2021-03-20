import {
   defineAsyncHandler,
   trimLength,
   responseError,
   responseSuccess,
} from '@helpers/functions';
import { nanoid } from 'nanoid';

import { useDB } from '@db';

import type { SignupBody } from '@type';
import { Msg } from '@messages';

export default defineAsyncHandler(async (req, res) => {
   const { username, password }: SignupBody = req.body;
   if (username && password) {
      // IF
      if (trimLength(username) < 1 || password.length < 1) {
         responseError(res, Msg.signup.error.errorMessage);
         return;
      } else {
         // ELSE
         const db = await useDB();
         const user = db
            .get('users')
            .find({
               username,
            })
            .value();

         if (user) {
            // IF
            responseError(res, Msg.signup.error.errorUserAlreadyExists);
         } else {
            // ELSE
            try {
               // get user, if not exists this will return undefined
               await db
                  .get('users')
                  .push({
                     id: nanoid(),
                     auth_id: nanoid(),
                     username,
                     password,
                     entries: [],
                  })
                  .write();

               responseSuccess(res, Msg.signup.success.userCreatedSuccessfully);
            } catch {
               responseError(
                  res,
                  Msg.signup.error.errorOccuredWhileCreatingNewUser
               );
            }
         }
         return;
      }
   } else {
      responseError(res, Msg.signup.error.errorMessage);
   }
});
