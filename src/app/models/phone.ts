import { PhoneType } from "app/enums/phone-type";

export class Phone {
  public Id: number;
  public PhoneNumber: PhoneType;
  public PhoneType: string;
  public CanText: boolean;
  public IsVerified: boolean;
  public IsPrimary: boolean;
}