import { useDB } from '@db';
import {
   checkDidUserLikeEntry,
   defineSyncHandler,
   getEntryPageOfHeader,
   responseError
} from '@helpers/functions';
import { Msg } from '@messages';
import {
   getHeaderResponse,
   getHeaderResponsePage,
   Header,
   HeaderResponse,
   User
} from '@type';
import v8 from 'v8';

// /header/{ header_id }/?page=1
export default defineSyncHandler((req, res) => {
   if (req.params) {
      const { header_id } = req.params;

      if (header_id) {
         const db = useDB();
         const header = db.get('headers').find({ id: header_id }).value();

         if (header) {
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
            const entryStart = 10 * page - 10;
            const entryEnd = entryStart + 10;
            const pageData: getHeaderResponsePage = {
               currentPage: page,
               totalPage: Math.ceil(header.entries.length / 10),
               totalResults: header.entries.length
            };

            let _header = v8.deserialize(v8.serialize(header)) as Header;
            _header.entries = _header.entries.slice(entryStart, entryEnd);

            const resData: getHeaderResponse = {
               id: _header.id,
               name: _header.name,
               entries: _header.entries.map(entry => {
                  const { liked_by, ...entryData } = entry;
                  const likeCount = liked_by.length;

                  let didUserLikeThisEntry = false;
                  if (res.locals && res.locals.auth) {
                     const auth = res.locals.auth as User;
                     didUserLikeThisEntry = checkDidUserLikeEntry({
                        auth,
                        entry_id: entry.id,
                        header_id: header.id
                     });
                  }

                  return {
                     ...entryData,
                     likeCount,
                     didLike: didUserLikeThisEntry,
                     page: getEntryPageOfHeader(_header.id, entryData.id)
                  };
               }),
               ...pageData
            };

            res.status(200).json(resData);
         } else {
            responseError(res, Msg.get_header.error.wrongHeaderID);
         }
      } else {
         responseError(res, Msg.get_header.error.neededParams);
      }
   } else {
      responseError(res, Msg.get_header.error.neededParams);
   }
   return;
});
