export interface IAppointment {
  patientId: number;
  patientName: string;
  date: string;
  status: Status;
}

export const enum Status {
  PENDING = 0,
  CONFIRMED = 1,
  COMPLETED = 2,
}
