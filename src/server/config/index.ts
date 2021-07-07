class _Config {
   public app = {
      port: 3000
   };
   public entry = {
      entryPerPage: 10
   };
   public auth = {
      usernameMax: 20,
      usernameMin: 3,
      passwordMax: 25,
      passwordMin: 6
   };
   public add_header = {
      headerMax: 50,
      headerMin: 1
   };
   public get_user = {
      pageEntryCount: 10 // her sayfa için kaç entry olacak.
   };
   public db_defaults = {
      jobDateStore: {},
      homeData: [],
      users: [],
      headers: [],
      leftContent: []
   };
}
export const Config = new _Config();
