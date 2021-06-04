import { useDB } from '@db';
import { defineSyncHandler } from '@helpers/functions';

interface SearchBody {
   query: string;
}

interface SearchResponse {
   name: string;
   id: string;
}

// No Auth
// Post: /search
// Body: SearchBody in this file.
export default defineSyncHandler((req, res) => {
   if (req.body && req.body.query) {
      const db = useDB();
      let resData = db
         .get('headers')
         .map(header => {
            return {
               id: header.id,
               name: header.name
            };
         })
         .value();
      let { query }: { query: string } = req.body;
      query = query.trim();

      resData = resData
         .filter(header => {
            return header.name.match(query.toLocaleLowerCase('tr-TR'));
         })
         .slice(0, 10);

      res.status(200).json(resData as SearchResponse[]);
   } else {
      res.status(200).json([]);
   }
});
