import { useDB } from '@db';
import {
   defineSyncHandler,
   responseError,
   responseSuccess
} from '@helpers/functions';
import { Msg } from '@messages';

// Auth Required
// DELETE /delete_entry/{ header_id  }/{ entry_id } | Authorization: {auth_id}
export default defineSyncHandler((req, res) => {
   const db = useDB();
   const { authorization } = req.headers;

   if (req.params && req.params.entry_id && req.params.header_id) {
      const { entry_id, header_id } = req.params;
      const header = db.get('headers').find({ id: header_id });

      if (header.value()) {
         const entry = header.get('entries').find({ id: entry_id });
         const entryValue = entry.value();
         if (entryValue) {
            const requestUsername = db
               .get('users')
               .find({ auth_id: authorization });
            const requestUserValue = requestUsername.value();

            if (
               entryValue.username === requestUserValue.username ||
               requestUsername.value().isAdmin
            ) {
               header.get('entries').remove({ id: entry_id }).write();

               db.get('users')
                  .find({ username: entryValue.username })
                  .get('entries')
                  .remove({ entry_id, header_id })
                  .write();

               db.get('users')
                  .find({ username: entryValue.username })
                  .get('likes')
                  .remove({ entry_id, header_id })
                  .write();

               responseSuccess(res, Msg.delete_entry.success.msg);
            } else {
               responseError(res, Msg.auth.error.msg);
            }
         } else {
            // WRONG ENTRY ID
            responseError(res, Msg.delete_entry.error.wrongEntryID);
         }
      } else {
         // WRONG HEADER ID
         responseError(res, Msg.delete_entry.error.wrongHeaderId);
      }
   } else {
      // MISSING PARAMETERS
      responseError(res, Msg.delete_entry.error.missingParameters);
   }
});
