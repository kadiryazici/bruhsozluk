import { useDB } from '@db';
import { defineSyncHandler } from '@helpers/functions';

export default defineSyncHandler((req, res) => {
   const db = useDB();
   const homeData = db.get('homeData').value();
   res.status(200).json(homeData);
});
