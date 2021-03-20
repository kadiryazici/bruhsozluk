import { useDB } from '@db';
import {
   defineAsyncHandler,
   responseError,
   sanitizeHeaderName,
   trimLength,
} from '@helpers/functions';
import { AddHeaderBody } from '@type';

const ERROR = {
   nameNeeded: 'Header name needed',
};

export default defineAsyncHandler(async (req, res) => {
   const { name }: AddHeaderBody = req.body;

   if (name && trimLength(name) > 0) {
      const sanitizedName = sanitizeHeaderName(name);
      res.status(200).json({
         msg: sanitizedName,
      });
   } else {
      responseError(res, ERROR.nameNeeded);
   }
});
