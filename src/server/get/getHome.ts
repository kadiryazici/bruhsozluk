import { useDB } from '@db';
import { checkDidUserLikeEntry, defineSyncHandler } from '@helpers/functions';
import { User, Header, HeaderResponse } from '@type';
import v8 from 'v8';

export default defineSyncHandler((req, res) => {
   const db = useDB();
   let homeData = db.get('homeData').value();
   let serializedHomeData = v8.deserialize(
      v8.serialize(homeData)
   ) as HeaderResponse[];

   if (res.locals && res.locals.auth) {
      const auth = res.locals.auth as User;
      serializedHomeData = serializedHomeData.map(header => {
         const { entries, ...hdr } = header;

         const fixedEntries = entries.map(entry => {
            const didLike = checkDidUserLikeEntry({
               entry_id: entry.id,
               header_id: header.id,
               auth
            });

            const db = useDB();
            const likeCount = db
               .get('headers')
               .find({
                  id: header.id
               })
               .get('entries')
               .find({
                  id: entry.id
               })
               .get('liked_by')
               .value().length;

            return {
               ...entry,
               didLike,
               likeCount: likeCount || 0
            };
         });

         return {
            ...hdr,
            entries: fixedEntries
         };
      });
   }
   res.status(200).json(serializedHomeData);
});
