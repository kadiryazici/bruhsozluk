import { useDB } from '@db';
import { getEntryPageOfHeader } from '@helpers/functions';
import { defineJob } from '@jobs/index';
import { Config } from '@server/config';
import { Entry, HeaderResponse } from '@type';
import _ from 'lodash';

export default defineJob({
   id: 'updateHome',
   perMinute: 25, // run every 25 minutes
   handler: updateHomeHandler
});

function updateHomeHandler() {
   const db = useDB();

   // shuffle all headers and pick first 5 one,
   const headers = db.get('headers').value();

   let _headers = [...headers];

   _headers = _headers.filter(v => v.entries.length > 0);
   _headers = _.shuffle(_headers);
   _headers = _headers.slice(0, 5);

   const fixedHeaders: HeaderResponse[] = _headers.map(header => {
      let sortedEntries = [...header.entries].sort(
         (a, b) => b.liked_by.length - a.liked_by.length
      );

      const { liked_by, ...entry } = sortedEntries[0];
      const entryPage = getEntryPageOfHeader(header.id, entry.id);
      return {
         id: header.id,
         name: header.name,
         entries: [
            {
               ...entry,
               likeCount: liked_by.length,
               page: entryPage
            }
         ]
      };
   });
   db.set('homeData', fixedHeaders).write();
}
