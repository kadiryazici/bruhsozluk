import { defineAsyncHandler } from '@helpers/functions';
import { User } from '@type';

export default defineAsyncHandler(async (req, res) => {
   res.json({
      b: 'c',
   });
});
