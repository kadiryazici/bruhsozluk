import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { logger } from '@tinyhttp/logger';
import bodyParser from 'body-parser';

import { useDB } from '@db';

import getHome from '@get/home';

import postSignup from '@post/signup';
import postLogin from '@post/login';
import postAddHeader from '@post/addHeader';

async function createServer() {
   /* DB SETUP: */ {
      const db = await useDB();
      db.defaults({
         users: [],
         headers: [],
      });
   }

   const app = new App();

   /* App USE: */ {
      app.use(cors());
      app.use(bodyParser.json());
      app.use(logger());
   }

   /* App GET: */ {
      app.get('/home', getHome);
   }
   /* App POST: */ {
      app.post('/signup', postSignup);
      app.post('/login', postLogin);
      app.post('/add_header', postAddHeader);
   }

   /* App LISTEN: */ {
      app.listen(3000, () => {
         console.log('server is on: 3000');
      });
   }
}
createServer();
