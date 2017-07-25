import { Authentication } from './authentication';
import { Email } from "app/models/email";
import { Phone } from "app/models/phone";

export class User {
    public Id: number;
    public Username: string = "";
    public FirstName:string = "";
    public LastName: string = "";
    public EmailAddresses: Email[] = [];
    public PhoneNumbers: Phone[] = [];
    public TwoFactorAuthentication: boolean = true;
    //public Authentication:Authentication = new Authentication();
}
