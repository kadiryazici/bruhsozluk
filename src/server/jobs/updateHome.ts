import { useDB } from '@db';
import { defineJob } from '@jobs/index';
import { Entry } from '@type';

export default defineJob({
   id: 'updateHome',
   perMinute: 25, // run every 25 minutes
   handler: updateHomeHandler,
});

function updateHomeHandler() {
   const db = useDB();

   // shuffle all headers and pick first 5 one,
   const headers = db.get('headers').shuffle().slice(0, 5).value();

   // get most liked entry from header.
   const entriesShuffledHeader = headers.map(header => {
      const object = {
         id: header.id,
         name: header.name,
         entries: [] as Entry[],
      };

      //if there is entry
      if (header.entries.length > 0) {
         const sortedEntries = [...header.entries].sort(
            (a, b) => b.liked_by.length - a.liked_by.length
         );
         object.entries = [sortedEntries[0]];
      }
      return object;
   });

   // remove headers that has 0 entry.
   const filteredHeaders = entriesShuffledHeader.filter(header => {
      return header.entries.length > 0;
   });
   db.set('homeData', filteredHeaders).write();
}
