import { useDB } from '@db';
import {
   defineSyncHandler,
   sanitizeUserName,
   responseError
} from '@helpers/functions';
import { Msg } from '@messages';
import { LeftContent } from '@type';
/*
AUTH NOT REQUIRED
/user/{ user_name }/?page=1
*/
export default defineSyncHandler((req, res) => {
   const db = useDB();
   const left = db.get('leftContent').value();
   res.json(left);
});
