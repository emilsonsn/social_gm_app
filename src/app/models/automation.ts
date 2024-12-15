import { User } from "./user";

export interface Automation {
  id: string;
  instance_id: string;
  farewell_message: string;
  welcome_message: string;
}