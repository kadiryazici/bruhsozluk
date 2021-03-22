import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { logger } from '@tinyhttp/logger';
import bodyParser from 'body-parser';

import { useDB } from '@db';
import { responseError } from '@helpers/functions';
import { Msg } from '@messages';

import middlewareAuthRequired from '@middleware/authRequired';

import postSignup from '@post/signup';
import postLogin from '@post/login';
import postAddHeader from '@post/addHeader';
import postAddEntry from '@post/addEntry';

import deleteHeader from '@delete/deleteHeader';

import getHeader from '@get/getHeader';

async function createServer() {
   /* DB SETUP: */ {
      const db = useDB();
      db.defaults({
         users: [],
         headers: [],
         leftContent: [],
      }).write();
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
   }
   /* App POST: */ {
      app.post('/signup', postSignup);
      app.post('/login', postLogin);
      app.post('/add_header', middlewareAuthRequired, postAddHeader);
      app.post('/add_entry', middlewareAuthRequired, postAddEntry);
   }

   /* App DELETE: */ {
      app.delete(
         '/delete_header/:header_id',
         middlewareAuthRequired,
         deleteHeader
      );
   }

   /* App LISTEN: */ {
      app.listen(3000, () => {
         console.log('server is on: 3000');
      });
   }
}
createServer();
