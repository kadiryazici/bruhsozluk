import { useDB } from '@db';
import { minuteToMiliseconds } from '@helpers/functions';
import chalk from 'chalk';

let timeout: null | ReturnType<typeof setTimeout> = null;

export interface Job {
   perMinute: number;
   handler: () => void | Promise<void>;
   id: string;
}

export function defineJob(job: Job): Job {
   return job;
}

const jobs: Job[] = [];

/**
 *
 * @param id This id will be stored in database, so app can remember the last time this job worked.
 * @param perMinute every minute for this job to work
 * @param fn handler function for job
 */
export function createJob(job: Job) {
   const { handler, perMinute, id } = job;
   const db = useDB();
   const lastTimeStore = db.get(`storedDates.${id}`).value();
   if (!lastTimeStore) {
      db.set(`storedDates.${id}`, 0).write();
   }
   jobs.push({
      handler,
      perMinute,
      id,
   });
}

export function startJobHandler() {
   timeout = globalThis.setTimeout(async () => {
      const db = useDB();
      for (const job of jobs) {
         const dbHeaderDate = db.get('storedDates').get(job.id);
         const lastTimeWorked = dbHeaderDate.value() as number;
         if (
            Date.now() - lastTimeWorked >=
            minuteToMiliseconds(job.perMinute)
         ) {
            db.set(`storedDates.${job.id}`, Date.now()).write();
            await job.handler();
            JobRunMessage(job.id);
         }
      }
      startJobHandler();
   }, 1000);
}

export function stopJobHandler() {
   if (timeout) {
      clearTimeout(timeout);
   }
}

export function JobRunMessage(job_name: string) {
   const text = `${chalk.magenta('JOB:')} ${chalk.green(job_name)} has run`;
   console.log(text);
}
