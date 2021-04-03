import { useDB } from '@db';
import {
   defineSyncHandler,
   responseError,
   responseSuccess,
} from '@helpers/functions';
import { PostLikeBody } from '@type';
import { Msg } from '@messages';

// Auth required middleware
// POST /like
// BODY header_id: string, entry_id: string
export default defineSyncHandler((req, res) => {
   const auth_id = req.headers.authorization!;
   const db = useDB();

   //IF ALL DATA I NEED EXISTS
   if (req.body && req.body.header_id && req.body.entry_id) {
      const { header_id, entry_id }: PostLikeBody = req.body;
      const header = db.get('headers').find({ id: header_id });

      // IF HEADER EXISTS
      if (header.value()) {
         const entry = header.get('entries').find({ id: entry_id });
         // IF ENTRY EXISTS
         if (entry.value()) {
            const liked_by = entry.get('liked_by');
            const likes = liked_by.value();
            const user = db.get('users').find({ auth_id });
            const username = user.get('username').value();

            // IF USER DID NOT LIKE ENTRY BEFORE
            if (!likes.includes(username)) {
               entry.get('liked_by').push(username).write();
               user
                  .get('likes')
                  .push({
                     entry_id,
                     header_id,
                  })
                  .write();

               responseSuccess(res, Msg.post_likeEntry.success.msg);
            } else {
               responseError(res, Msg.post_likeEntry.error.msg);
            }
         } else {
            responseError(res, Msg.post_likeEntry.error.msg);
         }
      } else {
         responseError(res, Msg.post_likeEntry.error.msg);
      }
   } else {
      responseError(res, Msg.post_likeEntry.error.msg);
   }
});
