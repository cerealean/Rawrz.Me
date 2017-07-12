import { Authentication } from './authentication';

export class User {
    public Id:number;
    public FirstName:string = "";
    public LastName:string = "";
    public Email:string = "";
    public Phone: string = "";
    public CanText: boolean = true;
    public CanEmail: boolean = true;
    public Authentication:Authentication = new Authentication();
}
