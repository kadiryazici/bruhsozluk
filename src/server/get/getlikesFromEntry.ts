import { useDB } from '@db';
import { defineSyncHandler, responseError } from '@helpers/functions';
import { Msg } from '@server/messages';
import { UserEntryStore } from '@type';

// get likes of entry
// likes/header_id/entry_id
export default defineSyncHandler((req, res) => {
   if (req.params && req.params.header_id && req.params.entry_id) {
      const db = useDB();
      const header = db.get('headers').find({
         id: req.params.header_id
      });

      if (header.value()) {
         const entry = header
            .get('entries')
            .find({
               id: req.params.entry_id
            })
            .value();
         if (entry) {
            const likes = entry.liked_by;
            res.json(likes);
         }
      }
   } else {
      return responseError(res, Msg.Likes.error.missingParameteres);
   }
});
