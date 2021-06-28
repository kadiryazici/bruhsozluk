import {
   defineSyncHandler,
   responseError,
   responseSuccess,
   sanitizeUserName
} from '@helpers/functions';
import { nanoid } from 'nanoid';

import { useDB } from '@db';

import type { SignupBody } from '@type';
import { Msg } from '@messages';
import { Config } from '@config';
import { Response } from '@tinyhttp/app';

export default defineSyncHandler((req, res) => {
   let { username, password }: SignupBody = req.body;
   username = sanitizeUserName(username);

   if (username && password) {
      if (!checkUsernameAndPassword(res, username, password)) {
         return;
      } else {
         // ELSE
         const db = useDB();
         const user = db
            .get('users')
            .find({
               username
            })
            .value();

         if (user) {
            // IF
            responseError(res, Msg.signup.error.errorUserAlreadyExists);
         } else {
            // ELSE
            try {
               // get user, if not exists this will return undefined
               db.get('users')
                  .push({
                     id: nanoid(),
                     auth_id: nanoid(),
                     username,
                     password,
                     isAdmin: false,
                     entries: [],
                     likes: []
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

function checkUsernameAndPassword(
   res: Response,
   username: string,
   password: string
) {
   const { usernameMax, usernameMin, passwordMax, passwordMin } = Config.auth;

   if (
      username.length < Config.auth.usernameMin ||
      username.length > Config.auth.usernameMax ||
      password.length < Config.auth.passwordMin ||
      password.length > Config.auth.passwordMax
   ) {
      if (
         (username.length < usernameMin || username.length > usernameMax) &&
         (password.length < passwordMin || password.length > passwordMax)
      ) {
         responseError(res, Msg.signup.error.username3_20AndPassword6_25);
      } else if (
         username.length < usernameMin ||
         username.length > usernameMax
      ) {
         responseError(res, Msg.signup.error.usernameShouldBeBetween3and20);
      } else if (
         password.length < Config.auth.passwordMin ||
         password.length > Config.auth.passwordMax
      ) {
         responseError(res, Msg.signup.error.passwordShouldBeBetween6and25);
      } else {
         responseError(res, Msg.signup.error.errorMessage);
      }
      return false;
   }
   return true;
}
