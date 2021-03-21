import { useDB } from '@db';
import {
   defineSyncHandler,
   responseError,
   responseSuccess,
} from '@helpers/functions';
import { Msg } from '@messages';

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
               id: header_id,
            })
            .value();

         if (header) {
            db.get('headers')
               .remove({
                  id: header_id,
               })
               .write();

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
