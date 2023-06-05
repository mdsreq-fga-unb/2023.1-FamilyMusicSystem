import { Location } from 'src/app/models/location';

export class Teacher {
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
  location: Location;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
