export const Config = {
   app: {
      port: 3000
   },
   auth: {
      usernameMax: 20,
      usernameMin: 3,
      passwordMax: 25,
      passwordMin: 6
   },
   add_header: {
      headerMax: 50,
      headerMin: 1
   },
   get_user: {
      pageEntryCount: 10 // her sayfa için kaç entry olacak.
   },
   db_defaults: {
      jobDateStore: {},
      homeData: [],
      users: [],
      headers: [],
      leftContent: []
   }
};
