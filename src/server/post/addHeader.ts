import { useDB } from '@db';
import {
   defineAsyncHandler,
   responseError,
   sanitizeHeaderName,
   trimLength,
} from '@helpers/functions';
import { AddHeaderBody, AddHeaderResponse } from '@type';
import { nanoid } from 'nanoid';
import { Msg } from '@messages';
import { Config } from '@config';

export default defineAsyncHandler(async (req, res) => {
   const { name }: AddHeaderBody = req.body;

   if (name && trimLength(name) > 0) {
      const db = await useDB();
      const sanitizedName = sanitizeHeaderName(name);

      const header = db
         .get('headers')
         .find({
            name: sanitizedName,
         })
         .value();

      if (!header) {
         const id = nanoid();
         const name = sanitizedName.slice(0, Config.add_header.headerMax);

         await db
            .get('headers')
            .push({
               entries: [],
               id,
               name,
            })
            .write();

         const response = { id, name } as AddHeaderResponse;
         res.status(200).json(response);
         // ENDIF
      } else {
         responseError(res, Msg.add_header.error.headerExists);
      }
   } else {
      responseError(res, Msg.add_header.error.nameNeeded);
   }
});
