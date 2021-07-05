type LeftContent = LeftContentItem[];

interface Database {
   homeData: Header[];
   jobDateStore: {};
   users: User[];
   headers: Header[];
   leftContent: LeftContent;
}

export interface Header {
   entries: Entry[];
   id: string;
   name: string;
}

export interface Entry {
   id: string;
   body: string;
   date: number;
   username: string;
   header_id: string;
   liked_by: string[];
}

// export type EntryResponse = Omit<Entry, 'liked_by'>
export interface EntryResponse extends Omit<Entry, 'liked_by'> {
   likeCount: number;
}

export interface HeaderResponse extends Omit<Header, 'entries'> {
   entries: EntryResponse[];
}

export interface LeftContentItem {
   id: string;
   name: string;
   total_entry: number;
}

export interface User {
   id: string;
   auth_id: string;
   username: string;
   password: string;
   entries: UserEntryStore[];
   likes: UserLikesStore[];
   isAdmin: boolean;
}

export interface GetUserResponse extends PageResponse {
   id: User['id'];
   username: User['username'];
   isAdmin: User['isAdmin'];
   totalEntry: number;
   totalLikes: number;
   entries: GetUserResponseEntries[];
}

export interface GetUserResponseEntries {
   header_name: Header['name'];
   header_id: Header['id'];
   entry: EntryResponse; // bu dizi olmayacak
}

export interface GetLikesResponse extends GetUserResponse {}
export interface GetLikedEntriesByUserEntries extends GetUserResponseEntries {}

export interface UserEntryStore {
   header_id: Header['id'];
   entry_id: Entry['id'];
}

export interface SignupBody {
   username: string;
   password: string;
}
export type LoginBody = SignupBody;
export interface LoginResponse {
   auth_id: string;
   username: string;
   isAdmin: boolean;
}

export interface AddHeaderBody {
   name: string;
   entryBody: string;
}
export interface AddHeaderResponse {
   id: string;
   entryPage: number;
}

export interface AddEntryBody {
   body: string;
   header_id: string;
}

export interface DeleteHeaderParams {
   header_id: string;
}

export interface PageResponse {
   currentPage: number;
   totalPage: number;
   totalResults: number;
}

export interface getHeaderResponsePage {
   currentPage: number;
   totalPage: number;
   totalResults: number;
}

export type getHeaderResponse = HeaderResponse & getHeaderResponsePage;

export interface PostLikeBody extends UserEntryStore {}
export interface UserLikesStore extends UserEntryStore {}

export interface VerifyHeaderBody extends AddHeaderBody {}

interface SearchBody {
   query: string;
}
export interface MsgResponse {
   type: string;
   msg: string;
}
interface SearchResponse {
   name: string;
   id: string;
}

interface AddEntryResponse extends Entry {
   page: number;
}
