import { Authentication } from './authentication';

export class User {
    public id:number;
    public firstName:string = "";
    public lastName:string = "";
    public email:string = "";
    public phone:string = "";
    public authentication:Authentication = new Authentication();
}
