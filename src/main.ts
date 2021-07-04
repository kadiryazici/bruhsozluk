// import { cors } from '@tinyhttp/cors';
import { logger } from '@tinyhttp/logger';
import cors from 'cors';
import express from 'express';
import { rateLimit } from '@tinyhttp/rate-limit';

import { Delete, Get, Listen, Post, Use } from '@app';

import { useDB } from '@db';
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
import postVerifyHeader from '@post/verifyHeader';

import deleteHeader from '@delete/deleteHeader';
import deleteEntry from '@delete/deleteEntry';

import getHeader from '@get/getHeader';
import getEntry from '@get/getEntry';
import getVerification from '@get/getVerification';
import getHome from '@get/getHome';
import getUser from '@get/getUser';
import getLikedEntriesByUser from '@get/getLikedEntriesByUser';
import getLeft from '@get/getLeft';
import getLikesFromEntry from '@get/getlikesFromEntry';

import { createJob, startJobHandler } from '@jobs/index';
import jobUpdateHome from '@jobs/updateHome';
import chalk from 'chalk';

async function createServer() {
   /* DB SETUP: */ {
      const db = useDB();
      db.defaults(Config.db_defaults).write();
   }

   /* App USE: */ {
      Use(cors());
      Use(express.json());
      Use(logger());
      Use(
         rateLimit({
            max: 100,
            windowMs: 1 * 60 * 1000,
            headers: true,
            message: JSON.stringify({
               type: 'error',
               msg: 'Limit Aşıldı Lütfen 1 Dakika Sonra Tekrar Deneyiniz'
            })
         })
      );
   }

   /* App GET: */ {
      Get('/header/:header_id', getHeader);
      Get('/entry/:header_id/:entry_id', getEntry);
      Get('/verify', getVerification);
      Get('/user/:userName', getUser);
      Get('/user/:userName/likes', getLikedEntriesByUser);
      Get('/home', getHome);
      Get('/left', getLeft);
      Get('/likes/:header_id/:entry_id', getLikesFromEntry);
   }

   /* App POST: */ {
      Post('/signup', postSignup);
      Post('/login', postLogin);
      Post('/search', postSearchHeader);
      Post('/add_header', middlewareAuthRequired, postAddHeader);
      Post('/add_entry', middlewareAuthRequired, postAddEntry);
      Post('/like', middlewareAuthRequired, postLikeEntry);
      Post('/unlike', middlewareAuthRequired, postUnlikeEntry);
      Post('/verify_header', middlewareAuthRequired, postVerifyHeader);
   }

   /* App DELETE: */ {
      Delete(
         '/delete_header/:header_id',
         middlewareAuthRequiredAdmin,
         deleteHeader
      );

      Delete(
         '/delete_entry/:header_id/:entry_id',
         middlewareAuthRequired,
         deleteEntry
      );
   }

   /* App LISTEN: */ {
      Listen(Config.app.port, () => {
         const str = `${chalk.magenta('SERVER')} ${chalk.green('is on:')}`;
         console.log(`${str} ${Config.app.port}`);
      });
   }

   /*Register JOBS: */ {
      createJob(jobUpdateHome);
      startJobHandler();
   }
}
createServer();
