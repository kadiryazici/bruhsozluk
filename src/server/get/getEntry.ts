import { useDB } from '@db';
import { defineSyncHandler, responseError } from '@helpers/functions';
import { Msg } from '@messages';

/* /entry/{ header_id  }/{ entry_id  } */
export default defineSyncHandler((req, res) => {
   const { error } = Msg.get_entry;
   if (req.params && req.params.header_id && req.params.entry_id) {
      const { header_id, entry_id } = req.params;

      const db = useDB();
      const header = db.get('headers').find({ id: header_id });

      if (header.value()) {
         const entry = header.get('entries').find({ id: entry_id }).value();

         if (entry) {
            const resData = entry;
            res.status(200).json(resData);
         } else {
            // ENTRY ID DOES NOT MITCH
            responseError(res, error.entryIdDoesNotMatch);
         }
      } else {
         // HEADER ID DOES NOT MATCH
         responseError(res, error.headerIdDoesNotMatch);
      }
   } else {
      responseError(res, error.missingParameters);
   }
});
