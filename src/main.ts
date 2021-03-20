import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { logger } from '@tinyhttp/logger';
import bodyParser from 'body-parser';

import { useDB } from '@db';

import postSignup from '@post/signup';
import postLogin from '@post/login';
import postAddHeader from '@post/addHeader';

import middlewareAuth from '@middleware/authRequired';

import { responseError } from '@helpers/functions';

import { Msg } from '@messages';

async function createServer() {
   /* DB SETUP: */ {
      const db = await useDB();
      db.defaults({
         users: [],
         headers: [],
      });
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
      // app.get('/home', getHome);
   }
   /* App POST: */ {
      app.post('/signup', postSignup);
      app.post('/login', postLogin);
      app.post('/add_header', middlewareAuth, postAddHeader);
   }

   /* App LISTEN: */ {
      app.listen(3000, () => {
         console.log('server is on: 3000');
      });
   }
}
createServer();
