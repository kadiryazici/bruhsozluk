import { useDB } from '@db';
import {
   defineSyncHandler,
   responseError,
   responseSuccess,
   sanitizeHeaderName,
} from '@helpers/functions';
import { Msg } from '@messages';
import { VerifyHeaderBody } from '@type';

// this request will be used to check if header exists or user can create this header.

// POST verify_header
// BODY: JSON = { name: string  }
export default defineSyncHandler((req, res) => {
   const db = useDB();
   const body: VerifyHeaderBody = req.body;

   if (body && body.name) {
      const name = body.name;
      const sanitizedHeaderName = sanitizeHeaderName(name);

      if (sanitizedHeaderName.length > 0) {
         const header = db
            .get('headers')
            .find({ name: sanitizedHeaderName })
            .value();

         if (!header) {
            responseSuccess(res, Msg.post_verify_header.success.msg);
         } else {
            responseError(res, Msg.post_verify_header.error.alreadyExists);
         }
      } else {
         responseError(res, Msg.post_verify_header.error.cannotCreate);
      }
   } else {
      responseError(res, Msg.post_verify_header.error.missingParameters);
   }
});
