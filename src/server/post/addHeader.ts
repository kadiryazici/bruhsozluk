import { useDB } from '@db';
import {
   defineAsyncHandler,
   responseError,
   sanitizeHeaderName
} from '@helpers/functions';
import {
   AddEntryBody,
   AddEntryResponse,
   AddHeaderBody,
   AddHeaderResponse
} from '@type';
import { nanoid } from 'nanoid';
import { Msg } from '@messages';
import { Config } from '@config';
import axios from 'axios';

// Auth required
// Post /add_header
// Body: AddHeaderBody in @types
export default defineAsyncHandler(async (req, res) => {
   const { name, entryBody }: AddHeaderBody = req.body;
   const auth_id = req.headers.authorization!;
   const { headerMax, headerMin } = Config.add_header;

   if (name) {
      const sanitizedName = sanitizeHeaderName(name);
      if (sanitizedName.length >= headerMin) {
         const db = useDB();

         const header = db
            .get('headers')
            .find({
               name: sanitizedName
            })
            .value();

         if (!header) {
            if (entryBody) {
               const headerID = nanoid();
               const name = sanitizedName.slice(0, headerMax);

               db.get('headers')
                  .push({
                     id: headerID,
                     name,
                     entries: []
                  })
                  .write();

               try {
                  const url =
                     'http' +
                     '://' +
                     'localhost:' +
                     Config.app.port +
                     '/add_entry';

                  const _res = await axios.post<AddEntryResponse>(
                     url,
                     {
                        header_id: headerID,
                        body: entryBody
                     } as AddEntryBody,
                     {
                        headers: {
                           Authorization: auth_id
                        }
                     }
                  );

                  const { data: entryData } = _res;
                  const response = {
                     id: headerID,
                     entryPage: entryData.page
                  } as AddHeaderResponse;

                  res.status(200).json(response);
               } catch (error) {
                  db.get('headers')
                     .remove({
                        id: headerID
                     })
                     .write();
                  responseError(res, Msg.add_header.error.anErrorOccured);
               }
            } else {
               responseError(res, Msg.add_header.error.entryBodyNeeded);
            }
         } else {
            responseError(res, Msg.add_header.error.headerExists);
         }
      } else {
         responseError(res, Msg.add_header.error.nameNeeded);
      }
   } else {
      responseError(res, Msg.add_header.error.nameNeeded);
   }
});
