import { useDB } from '@db';
import {
   defineSyncHandler,
   responseError,
   sanitizeHeaderName
} from '@helpers/functions';
import { AddHeaderBody, AddHeaderResponse } from '@type';
import { nanoid } from 'nanoid';
import { Msg } from '@messages';
import { Config } from '@config';

export default defineSyncHandler((req, res) => {
   const { name }: AddHeaderBody = req.body;

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
            const id = nanoid();
            const name = sanitizedName.slice(0, headerMax);

            db.get('headers')
               .push({
                  entries: [],
                  id,
                  name
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
   } else {
      responseError(res, Msg.add_header.error.nameNeeded);
   }
});
