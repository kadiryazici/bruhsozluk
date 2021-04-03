import { useDB } from '@db';
import { minuteToMiliseconds } from '@helpers/functions';
import chalk from 'chalk';

export interface Job {
   perMinute: number;
   handler: () => void | Promise<void>;
   id: string;
}

let timeout: null | ReturnType<typeof setTimeout> = null;
// const jobs: Job[] = [];

type JobMap = Map<
   string,
   { handler: Job['handler']; perMinute: Job['perMinute'] }
>;
const jobsMap: JobMap = new Map();

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
   jobsMap.set(id, {
      perMinute,
      handler,
   });
}

export function startJobHandler() {
   timeout = globalThis.setTimeout(async () => {
      const db = useDB();
      for (const [jobID, jobData] of jobsMap) {
         const dbHeaderDate = db.get('storedDates').get(jobID);
         const lastTimeWorked = dbHeaderDate.value() as number;
         if (
            Date.now() - lastTimeWorked >=
            minuteToMiliseconds(jobData.perMinute)
         ) {
            db.set(`storedDates.${jobID}`, Date.now()).write();
            await jobData.handler();
            JobRunMessage(jobID);
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

export function defineJob(job: Job): Job {
   return job;
}
