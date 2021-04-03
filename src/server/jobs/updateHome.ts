import { useDB } from '@db';
import { defineJob } from '@jobs/index';
import { Entry } from '@type';

export default defineJob({
   id: 'updateHome',
   perMinute: 0.05,
   handler: updateHomeHandler,
});

function updateHomeHandler() {
   const db = useDB();

   // tüm başlıkları karıştır,
   const headers = db.get('headers').shuffle().slice(0, 5).value();

   // rastgele seçilmiş entrylerin en çok beğenilenini al
   const entriesShuffledHeader = headers.map(value => {
      const object = { id: value.id, name: value.name, entries: [] as Entry[] };

      if (object.entries.length > 0) {
         const sorted = object.entries.sort(
            (a, b) => b.liked_by.length - a.liked_by.length
         );
         object.entries = [sorted[0]];
      }
      return object;
   });

   // 0 tane entrysi olan başlıkları sil
   const filteredHeaders = entriesShuffledHeader.filter(header => {
      return header.entries.length > 0;
   });
   db.set('homeData', filteredHeaders);
}
