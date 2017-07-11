import { User } from "app/models/user";
import { Role } from "app/models/role";

export class ScheduledUser {
  public user: User;
  public role: Role;
  public scheduledOn: Date;
}