import type { IStudent } from '$lib/server/models/Student';

export default interface IGroup {
  number: number;
  members: IStudent[];
  color: string;
}
