import { useDB } from '@db';
import { defineSyncHandler, responseError } from '@helpers/functions';
import { Msg } from '@messages';
import { getHeaderResponse, getHeaderResponsePage } from '@type';

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
               totalResults: header.entries.length,
            };
            console.log({ entryStart, entryEnd });
            header.entries = header.entries.slice(entryStart, entryEnd);

            res.status(200).json({
               ...pageData,
               ...header,
            } as getHeaderResponse);
         } else {
            responseError(res, Msg.get_header.error.wrongHeaderID);
         }
      } else {
         responseError(res, Msg.get_header.error.neededParams);
      }
   } else {
      responseError(res, Msg.get_header.error.neededParams);
   }
});
