import { useDB } from '@db';
import { defineSyncHandler, responseError } from '@helpers/functions';
import { Msg } from '@messages';

// DELETE /delete_entry/{ header_id  }/{ entry_id } | Authorization: {auth_id}
export default defineSyncHandler((req, res) => {
   const db = useDB();
   if (req.params) {
      const { entry_id } = req.params;
      const entry = db.get('hea');
   } else {
      // MISSING PARAMETERS
   }

   const { authorization } = req.headers;
   const username = db.get('users').find({ auth_id: authorization! });
});
