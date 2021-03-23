import { useDB } from '@db';
import {
   defineSyncHandler,
   responseError,
   sanitizeEntryBody,
} from '@helpers/functions';
import { Msg } from '@messages';
import { AddEntryBody, Entry } from '@type';
import { nanoid } from 'nanoid';

// AUTH REQUIRED
export default defineSyncHandler((req, res) => {
   const { body, header_id }: AddEntryBody = req.body;
   const { error } = Msg.add_entry;
   const { authorization } = req.headers;

   if (body && header_id) {
      const db = useDB();
      const header = db.get('headers').find({ id: header_id });

      if (header.value()) {
         const entryBody = sanitizeEntryBody(body);

         if (entryBody.length > 0) {
            const user = db.get('users').find({
               auth_id: authorization,
            });

            const username = user.get('username').value();

            let data = {
               body,
               date: Date.now(),
               id: nanoid(),
               liked_by: [],
               username,
            } as Entry;

            header.get('entries').push(data).write();

            // add entry to user's profile
            user
               .get('entries')
               .push({
                  entry_id: data.id,
                  header_id: header.get('id').value(),
               })
               .write();

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
