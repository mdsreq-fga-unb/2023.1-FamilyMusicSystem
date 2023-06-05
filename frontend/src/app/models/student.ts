import { LegalGuardian } from 'src/app/models/legalguardian';
import { Location } from 'src/app/models/location';

export class Student {
  id: number;
  Name: string;
  Surname: string;
  Email: string;
  Phone: string;
  Birthday: string;
  DisabledPerson: boolean;
  DisabledPersonType: string;
  CPF: string;
  RG: string;
  Gender: string;
  LegalGuardian?: LegalGuardian;
  Location: Location;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
