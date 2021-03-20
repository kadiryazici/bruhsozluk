import {
   defineAsyncHandler,
   trimLength,
   responseError,
   responseSuccess,
} from '@helpers/functions';
import { nanoid } from 'nanoid';

import { useDB } from '@db';

import type { SignupBody } from '@type';

const ERROR = {
   errorMessage: 'Please fill inputs correctly',
   errorUserAlreadyExists: 'User already exists',
   errorOccuredWhileCreatingNewUser: 'An error occured while creating new user',
};

const SUCCESS = {
   userCreatedSuccessfully: 'User has been created successfully',
};

export default defineAsyncHandler(async (req, res) => {
   const { username, password }: SignupBody = req.body;
   if (username && password) {
      if (trimLength(username) < 1 || password.length < 1) {
         responseError(res, ERROR.errorMessage);
         return;
      } else {
         const db = await useDB();
         const user = db
            .get('users')
            .find({
               username,
            })
            .value();

         if (user) {
            responseError(res, ERROR.errorUserAlreadyExists);
         } else {
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

               responseSuccess(res, SUCCESS.userCreatedSuccessfully);
            } catch {
               responseError(res, ERROR.errorOccuredWhileCreatingNewUser);
            }
         }
         return;
      }
   } else {
      responseError(res, ERROR.errorMessage);
   }
});
