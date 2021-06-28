import { useDB } from '@db';
import { defineJob } from '@jobs/index';
import { Entry } from '@type';
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

   _headers = _headers.map(v => {
      const sortedEntries = [...v.entries].sort(
         (a, b) => b.liked_by.length - a.liked_by.length
      );
      return {
         id: v.id,
         name: v.name,
         entries: [sortedEntries[0]]
      };
   });

   // // get most liked entry from header.
   // const entriesShuffledHeader = headers.map(header => {
   //    const object = {
   //       id: header.id,
   //       name: header.name,
   //       entries: [] as Entry[]
   //    };

   //    //if there is entry
   //    if (header.entries.length > 0) {
   //       const sortedEntries = [...header.entries].sort(
   //          (a, b) => b.liked_by.length - a.liked_by.length
   //       );
   //       object.entries = [sortedEntries[0]];
   //    }
   //    return object;
   // });

   // // remove headers that has 0 entry.
   // const filteredHeaders = entriesShuffledHeader.filter(header => {
   //    return header.entries.length > 0;
   // });
   db.set('homeData', _headers).write();
}
