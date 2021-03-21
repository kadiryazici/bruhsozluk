type LeftContent = LeftContentItem[];

interface Database {
   users: User[];
   headers: Header[];
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
   like_count: number;
}

export interface LeftContentItem {
   id: string;
   header_name: string;
   total_entry: number;
}

export interface User {
   id: string;
   auth_id: string;
   username: string;
   password: string;
   entries: UserEntryStore[];
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
