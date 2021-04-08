import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { logger } from '@tinyhttp/logger';
import bodyParser from 'body-parser';

import { useDB } from '@db';
import { responseError } from '@helpers/functions';
import { Msg } from '@messages';
import { Config } from '@config';

import middlewareAuthRequired from '@middleware/authRequired';
import middlewareAuthRequiredAdmin from '@middleware/authRequiredAdmin';

import postSignup from '@post/signup';
import postLogin from '@post/login';
import postAddHeader from '@post/addHeader';
import postAddEntry from '@post/addEntry';
import postSearchHeader from '@post/searchHeader';
import postLikeEntry from '@post/likeEntry';
import postUnlikeEntry from '@post/unlikeEntry';

import deleteHeader from '@delete/deleteHeader';
import deleteEntry from '@delete/deleteEntry';

import getHeader from '@get/getHeader';
import getEntry from '@get/getEntry';
import getVerification from '@get/getVerification';
import getHome from '@get/getHome';
import getUser from '@get/getUser';
import getLikedEntriesByUser from '@get/getLikedEntriesByUser';

import { createJob, startJobHandler } from '@jobs/index';
import jobUpdateHome from '@jobs/updateHome';

async function createServer() {
   /* DB SETUP: */ {
      const db = useDB();
      db.defaults(Config.db_defaults).write();
   }

   const app = new App({
      // sunucu temelli bir hata olduğunda, bu hatayı ben devralıyorum.
      onError: (err, req, res) => {
         responseError(res, Msg.app.error.msg);
      },
   });

   /* App USE: */ {
      app.use(cors());
      app.use(bodyParser.json());
      app.use(logger());
   }

   /* App GET: */ {
      app.get('/header/:header_id', getHeader);
      app.get('/entry/:header_id/:entry_id', getEntry);
      app.get('/verify', getVerification);
      app.get('/user/:userName', getUser);
      app.get('/user/:userName/likes', getLikedEntriesByUser);
      app.get('/home', getHome);
   }

   /* App POST: */ {
      app.post('/signup', postSignup);
      app.post('/login', postLogin);
      app.post('/add_header', middlewareAuthRequired, postAddHeader);
      app.post('/add_entry', middlewareAuthRequired, postAddEntry);
      app.post('/search', postSearchHeader);
      app.post('/like', middlewareAuthRequired, postLikeEntry);
      app.post('/unlike', middlewareAuthRequired, postUnlikeEntry);
   }

   /* App DELETE: */ {
      app.delete(
         '/delete_header/:header_id',
         middlewareAuthRequiredAdmin,
         deleteHeader
      );

      app.delete(
         '/delete_entry/:header_id/:entry_id',
         middlewareAuthRequired,
         deleteEntry
      );
   }

   /* App LISTEN: */ {
      app.listen(3000, () => {
         console.log('server is on: 3000');
      });
   }

   /*Register JOBS: */ {
      createJob(jobUpdateHome);
      startJobHandler();
   }
}
createServer();
