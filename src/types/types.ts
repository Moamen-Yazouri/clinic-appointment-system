// export interface IAppointment {
//   patientDetails: IPatient;
//   appointmentId: number;
//   status: Status;
// }

export interface IAppointment {
  name: string;
  contact: number | string;
  age: number | string;
  gender: string;
  dateTime: Date | null;
  symptoms: string;
  appointmentId: number;
  status: Status;
}

export enum Status {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  COMPLETED = "Completed",
}
