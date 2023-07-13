import { Room } from "./room";
import { Student } from "./student";
import { Teacher } from "./teacher";

export class Schedule {
  id: number;
  Horary: string;
  ID_Room: number;
  ID_Student: number;
  ID_Teacher: number;
  RoomObject: Room;
  StudentObject: Student;
  TeacherObject: Teacher;
}
