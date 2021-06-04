import { useDB } from '@db';
import {
   defineSyncHandler,
   responseError,
   responseSuccess
} from '@helpers/functions';
import { Msg } from '@messages';
import { removeHeaderFromLeft } from '@server/leftContent';

// /delete_header/{ header_id }
export default defineSyncHandler((req, res) => {
   const { error, success } = Msg.delete_header;

   if (req.params) {
      const { header_id } = req.params;
      if (header_id) {
         const db = useDB();

         const header = db
            .get('headers')
            .find({
               id: header_id
            })
            .value();

         if (header) {
            const header_id = header.id;

            db.get('headers')
               .remove({
                  id: header_id
               })
               .write();

            // loop throught all users and delete entries that belongs to deleted header.
            deleteHeaderEntriesFromUsers(header_id);

            responseSuccess(res, success.msg);
         } else {
            responseError(res, error.headerDoesNotExist);
         }
      } else {
         responseError(res, error.headerIdNeeded);
      }
   } else {
      responseError(res, error.missingParameters);
   }
});

function deleteHeaderEntriesFromUsers(header_id: string) {
   const db = useDB();
   db.get('users')
      .forEach(user => {
         const user_id = user.id;
         db.get('users')
            .find({ id: user_id })
            .get('entries')
            .remove({ header_id })
            .write();

         db.get('users')
            .find({ id: user_id })
            .get('likes')
            .remove({ header_id })
            .write();
      })
      .write();

   removeHeaderFromLeft(header_id);
}
