export interface IAppointment {
  name: string;
  contact: number | string;
  age: number | string;
  gender: string;
  dateTime: Date | null;
  symptoms: string;
  appointmentId: number;
  status: Status;
  note: string;
}

export enum Status {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  COMPLETED = "Completed",
}
