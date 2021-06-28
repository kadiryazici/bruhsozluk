import { useDB } from '@db';
import {
   defineAsyncHandler,
   responseError,
   sanitizeEntryBody
} from '@helpers/functions';
import { Msg } from '@messages';
import { AddEntryBody, AddEntryResponse, Entry } from '@type';
import { nanoid } from 'nanoid';
import { addHeader2Left } from '@server/leftContent';

// AUTH REQUIRED
// Post add_entry
// Body: AddEntryBody in @types
export default defineAsyncHandler(async (req, res) => {
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
               auth_id: authorization
            });

            const username = user.get('username').value();

            const data = {
               id: nanoid(),
               header_id: header.value().id,
               username,
               body,
               date: Date.now(),
               liked_by: []
            } as Entry;

            header.get('entries').push(data).write();

            // add entry to user's profile
            user
               .get('entries')
               .push({
                  entry_id: data.id,
                  header_id: header.get('id').value()
               })
               .write();

            // add current header to left content, because it is the last one b*tch.
            await addHeader2Left(header.value().id);

            const resData: AddEntryResponse = {
               ...data,
               page: Math.ceil(header.get('entries').value().length / 10)
            };

            res.status(200).json(resData);
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
