import { useDB } from '@db';
import {
   defineSyncHandler,
   sanitizeUserName,
   responseError,
} from '@helpers/functions';
import { Msg } from '@messages';
import { GetUserResponse, GetUserResponseEntries } from '@type';
import { Config } from '@config';
/*
AUTH NOT REQUIRED
/user/{ user_name }/?page=1
*/
export default defineSyncHandler((req, res) => {
   if (req.params && req.params.userName) {
      let page = 1;

      if (
         !req.query ||
         typeof req.query.page !== 'string' ||
         isNaN(parseInt(req.query.page)) ||
         parseInt(req.query.page) < 1
      ) {
         page = 1;
      } else {
         page = parseInt(req.query.page);
      }

      let { userName } = req.params;
      const clearUserName = sanitizeUserName(userName);

      if (clearUserName) {
         const db = useDB();
         console.log({
            clearUserName,
         });
         const user = db.get('users').find({ username: clearUserName });
         if (user.value()) {
            let userEntryDetails = user.get('entries').value(); // bu dizi
            const userData = user.value();

            const { pageEntryCount } = Config.get_user;
            const entryStart = pageEntryCount * page - pageEntryCount;
            const entryEnd = entryStart + pageEntryCount;

            const totalResults = userEntryDetails.length;
            const totalPage = Math.ceil(userEntryDetails.length / 10);
            const currentPage = page;

            userEntryDetails = userEntryDetails.slice(entryStart, entryEnd);

            const responseEntryData: GetUserResponseEntries[] = userEntryDetails.map(
               value => {
                  const header = db
                     .get('headers')
                     .find({ id: value.header_id });
                  const header_id = header.get('id').value();
                  const header_name = header.get('name').value();

                  const entry = header
                     .get('entries')
                     .find({ id: value.entry_id })
                     .value();

                  return {
                     header_id,
                     header_name,
                     entry,
                  };
               }
            );

            res.status(200).json(<GetUserResponse>{
               username: userData.username,
               id: userData.id,
               isAdmin: userData.isAdmin,
               entries: responseEntryData,
               currentPage,
               totalPage,
               totalResults,
            });
         } else {
            // KULLANICI BULUNAMADI
            responseError(res, Msg.get_header.error.wrongHeaderID); // yanlış username?
         }
      } else {
         responseError(res, Msg.get_header.error.neededParams);
      }
   } else {
      responseError(res, Msg.get_header.error.neededParams);
   }
});
