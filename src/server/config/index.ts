export class Config {
   static app = {
      port: 3000
   };
   static entry = {
      entryPerPage: 10
   };
   static auth = {
      usernameMax: 20,
      usernameMin: 3,
      passwordMax: 25,
      passwordMin: 6
   };
   static add_header = {
      headerMax: 50,
      headerMin: 1
   };
   static get_user = {
      pageEntryCount: 10 // her sayfa için kaç entry olacak.
   };
   static db_defaults = {
      jobDateStore: {},
      homeData: [],
      users: [],
      headers: [],
      leftContent: []
   };
}
