import { useDB } from '@db';
import {
   defineSyncHandler,
   sanitizeUserName,
   responseError,
   getEntryPageOfHeader
} from '@helpers/functions';
import { Msg } from '@messages';
import { EntryResponse, GetUserResponse, GetUserResponseEntries } from '@type';
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

         const user = db.get('users').find({ username: clearUserName });
         if (user.value()) {
            const userEntryDetails = [...user.get('entries').value()];
            const userLikedEntriesCount = user.get('likes').value().length;

            const userData = user.value();

            const { pageEntryCount } = Config.get_user;
            const entryStart = pageEntryCount * page - pageEntryCount;
            const entryEnd = entryStart + pageEntryCount;

            const totalResults = userEntryDetails.length;
            const totalPage = Math.ceil(userEntryDetails.length / 10);
            const currentPage = page;

            const entrySlice = userEntryDetails
               .reverse()
               .slice(entryStart, entryEnd);

            const responseEntryData: GetUserResponseEntries[] = entrySlice.map(
               value => {
                  const header = db
                     .get('headers')
                     .find({ id: value.header_id });
                  const header_id = header.get('id').value();
                  const header_name = header.get('name').value();

                  const dbEntryData = header
                     .get('entries')
                     .find({ id: value.entry_id })
                     .value();

                  const entryPage = getEntryPageOfHeader(
                     header_id,
                     dbEntryData.id
                  );

                  const { liked_by, ...entry } = dbEntryData;

                  const entryResponse: EntryResponse = {
                     ...entry,
                     likeCount: liked_by.length,
                     page: entryPage
                  };

                  return {
                     header_id,
                     header_name,
                     entry: entryResponse
                  };
               }
            );

            res.status(200).json({
               username: userData.username,
               id: userData.id,
               isAdmin: userData.isAdmin,
               entries: responseEntryData,
               totalLikes: userLikedEntriesCount,
               totalEntry: userEntryDetails.length,
               currentPage,
               totalPage,
               totalResults
            } as GetUserResponse);
         } else {
            // KULLANICI BULUNAMADI
            responseError(res, Msg.GetUser.error.userNotFound); // yanlış username?
         }
      } else {
         responseError(res, Msg.GetUser.error.missingParameters);
      }
   } else {
      responseError(res, Msg.GetUser.error.missingParameters);
   }
});
