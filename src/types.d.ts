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
   liked_by: string[];
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
export interface UserEntryStore {
   header_id: string;
   entry_id: string;
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
}
export interface AddHeaderResponse {
   id: string;
}

export interface AddEntryBody {
   body: string;
   header_id: string;
}

export interface DeleteHeaderParams {
   header_id: string;
}

export interface getHeaderResponsePage {
   currentPage: number;
   totalPage: number;
   totalResults: number;
}
export type getHeaderResponse = Header & getHeaderResponsePage;

export interface PostLikeBody extends UserEntryStore {}
export interface UserLikesStore extends UserEntryStore {}
