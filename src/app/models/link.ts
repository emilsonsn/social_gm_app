import { User } from "./user";

export interface Link {
  id?: number;
  name: string;
  url: string;
  user_id: number;
  user?: User;
}
