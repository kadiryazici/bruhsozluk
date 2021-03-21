import { Config } from '@config';
import { useDB } from '@db';
import {
   defineSyncHandler,
   responseError,
   sanitizeEntryBody,
} from '@helpers/functions';
import { AddEntryBody, Entry } from '@type';
import { nanoid } from 'nanoid';

// /addentry
export default defineSyncHandler((req, res) => {
   const { body, header_id }: AddEntryBody = req.body;
   const { error } = Config.add_entry;
   const { authorization } = req.headers;

   if (body && header_id) {
      const db = useDB();
      const header = db.get('headers').find({ id: header_id });

      if (header.value()) {
         const entryBody = sanitizeEntryBody(body);
         const entryBodyLength = entryBody.length;

         if (entryBody.length > 0) {
            const username = db
               .get('users')
               .find({
                  auth_id: authorization,
               })
               .get('username')
               .value();

            let data = {
               body,
               date: Date.now(),
               id: nanoid(),
               like_count: 0,
               username,
            } as Entry;

            header.get('entries').push(data).write();

            res.status(200).json(data);
         } else {
            responseError(res, error.bodyShouldHaveAtLeastOneLetter);
         }
      } else {
         responseError(res, error.wrongHeaderId);
      }
   } else {
      if (!body && !header_id) {
         responseError(res, error.missingData);
         return;
      }

      if (!body) {
         responseError(res, error.bodyNeeded);
         return;
      }

      if (!header_id) {
         responseError(res, error.headerIdNeeded);
         return;
      }
      responseError(res, error.missingData);
      return;
   }
});
