import { useDB } from '@db';
import {
   defineAsyncHandler,
   responseError,
   sanitizeHeaderName,
   trimLength,
} from '@helpers/functions';
import { AddHeaderBody, AddHeaderResponse } from '@type';
import { nanoid } from 'nanoid';

const ERROR = {
   nameNeeded: 'Başlık ismi gerekiyor.',
   headerExists: 'Bu başlık zaten var.',
   authError: 'Kullanıcı kimliği hatası.',
   couldntFindUser: 'Kullanıcı bulunamadı.',
   errorOnAddingHeader: 'Başlık oluşturmada bir hata oluştu.',
};

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
         const name = sanitizedName.slice(0, 50);
         await db
            .get('headers')
            .push({
               entries: [],
               id,
               name,
            })
            .write();
         res.status(200).json({
            id,
            name,
         } as AddHeaderResponse);
      } else {
         responseError(res, ERROR.headerExists);
      }
   } else {
      responseError(res, ERROR.nameNeeded);
   }
});
