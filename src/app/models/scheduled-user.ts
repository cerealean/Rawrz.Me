import { User } from "app/models/user";

export class ScheduledUser {
  public user: User;
  public position: string;
  public scheduledOn: Date;
}