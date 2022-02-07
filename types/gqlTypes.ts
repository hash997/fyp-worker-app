export interface Worker {
  id: string;
  fName: string;
  lName: string;
  email: string;
  icNo: string;
  phoneNo: string;
  speciality: WorkerSpeciality;
  hourlyRate: number;
  city: string;
  offers: [Offer];
  appointments: [Appointment];
  lat: string;
  lng: string;
  isActive: boolean;
}

export interface Offer {
  id: string;
  customerId: string;
  workerId: string;
  jobId: string;
  price: number;
  sentAt: string;
  status: OfferStatus;
}

export interface Appointment {
  id: string;
  customerId: string;
  workerId: string;
  offerId: string;
  time: string;
  status: String;
}

export enum OfferStatus {
  sent = "SENT",
  accepted = "ACCEPTED",
  completed = "COMPELTED",
  canceled = "CANCELED",
}

enum WorkerSpeciality {
  handyman = "HANDYMAN",
  driver = "DRIVER",
  airconSpec = "AIRCONSPEC",
  plumber = "PLUMBER",
}
