import { PhoneType } from "app/enums/phone-type";

export class Phone {
  public Id: number = 0;
  public PhoneNumber: string = "";
  public PhoneType: PhoneType = PhoneType.Mobile;
  public CanText: boolean = true;
  public IsVerified: boolean = false;
  public IsPrimary: boolean = false;
}