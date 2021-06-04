import { useDB } from '@db';
import { Msg } from '@messages';
import { Header } from '@type';

export function addHeader2Left(headerID: Header['id']): Promise<string> {
   return new Promise((resolve, reject) => {
      const db = useDB();
      const header = db.get('headers').find({ id: headerID });
      const { error, success } = Msg.left_content;

      // REJECT IF HEADER DOES NOT EXIST
      if (!header.value()) {
         return reject(error.headerNotFound);
      }

      const { entries, name, id } = header.value();
      const headerInLeft = db.get('leftContent').find({ name }).value();

      // if header name is already exists in the left content, remove it.
      if (headerInLeft) {
         db.get('leftContent').remove({ name }).write();
      }

      // if left content length is equal to 50 or more than that, remove the last item.
      if (entries.length >= 50) {
         db.get('leftContent').pop().write();
      }

      //add current header to left content.
      db.get('leftContent')
         .unshift({
            id,
            name,
            total_entry: entries.length
         })
         .write();

      return resolve(success);
   });
}

export function removeHeaderFromLeft(headerId: Header['id']) {
   const db = useDB();
   const header = db.get('leftContent').find({ id: headerId }).value();
   if (header) {
      db.get('leftContent').remove({ id: headerId }).write();
   }
}
