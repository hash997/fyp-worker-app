/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCustomerInput = {
  fName: string;
  lName: string;
  email: string;
  phoneNo: string;
  postalZipCode?: string | null;
};

export type Customer = {
  __typename: "Customer";
  id: string;
  fName: string;
  lName: string;
  email: string;
  phoneNo: string;
  postalZipCode?: string | null;
  jobRequests: Array<JobRequest | null>;
  appointments?: Array<Appointment | null> | null;
};

export type JobRequest = {
  __typename: "JobRequest";
  id: string;
  customerId: string;
  location: Location;
  city: string;
  status: JobStatus;
  title: string;
  description: string;
  totalCost: number;
  offers: Offer[] | [];
  sentAt: string;
  completedAt?: string | null;
  speciality: WorkerSpeciality;
};
export type JobRequestToWorker = {
  __typename: "JobRequest";
  id: string;
  customerId: string;
  workerId: string;
  location: Location;
  status: JobStatus;
  title: string;
  description: string;
  totalCost: number;
  offers?: Array<Offer | null> | null;
  customer: Customer;
  worker: Worker;
  sentAt: string;
  completedAt?: string | null;
  time: Date;
};

export type Location = {
  __typename: "Location";
  id: string;
  customerId: string;
  lng: string;
  lat: string;
  state: string;
  city: string;
  address: string;
};

export enum JobStatus {
  CREATED = "CREATED",
  ACCEPTED = "ACCEPTED",
  CUSTOMER_CANCELED = "CUSTOMER_CANCELED",
  WORKER_CALNCELED = "WORKER_CALNCELED",
  COMPLETED = "COMPLETED",
  CLIENT_DIDNT_SHOW_UP = "CLIENT_DIDNT_SHOW_UP",
  WORKER_DIDNT_SHOW_UP = "WORKER_DIDNT_SHOW_UP",
}

export type Offer = {
  __typename: "Offer";
  id: string;
  customerId: string;
  workerId: string;
  jobId: string;
  price: number;
  sentAt: string;
  status: OfferStatus;
};

export enum OfferStatus {
  SENT = "SENT",
  ACCEPTED = "ACCEPTED",
  COMPELTED = "COMPELTED",
  CANCELED = "CANCELED",
}

export type Appointment = {
  __typename: "Appointment";
  id: string;
  customerId: string;
  workerId: string;
  offerId: string;
  time: string;
  status?: AppointmentStatus;
};

export enum AppointmentStatus {
  UPCOMING = "UPCOMING",
  CUSTOMER_CANCELLED = "CUSTOMER_CANCELLED",
  WORKER_CANCELED = "WORKER_CANCELED",
  COMPLETED = "COMPLETED",
  CUSTOMER_NO_SHOW_UP = "CUSTOMER_NO_SHOW_UP",
  WORER_NO_SHOW_UP = "WORER_NO_SHOW_UP",
}

export type CreateWorkerInput = {
  fName: string;
  lName: string;
  email: string;
  icNo: string;
  phoneNo: string;
  city: string;
  hourlyRate: number;
  speciality: WorkerSpeciality;
};

export enum WorkerSpeciality {
  HANDYMAN = "HANDYMAN",
  DRIVER = "DRIVER",
  AIRCONSPEC = "AIRCONSPEC",
  PLUMBER = "PLUMBER",
}

export type Worker = {
  __typename: "Worker";
  id: string;
  fName: string;
  lName: string;
  email: string;
  icNo: string;
  phoneNo: string;
  speciality: WorkerSpeciality;
  offers: Offer[] | [];
  city: string;
  lat: string;
  lng: string;
  hourlyRate: number;
  isActive: boolean;
  appointments?: Appointment[] | [];
};

export type CreateJobRequestInput = {
  customerId: string;
  location: CreateLocationInput;
  status: JobStatus;
  title: string;
  city: string;
  description: string;
};

export type CreateLocationInput = {
  customerId: string;
  lng: string;
  lat: string;
  state: string;
  city: string;
  address: string;
};

export type CreateOfferInput = {
  customerId: string;
  workerId: string;
  jobId: string;
  price: number;
};

export type UpdateCustomerInput = {
  id: string;
  fName?: string | null;
  lName?: string | null;
  email?: string | null;
  phoneNo?: string | null;
  postalZipCode?: string | null;
};

export type UpdateWorkerInput = {
  id: string;
  fName?: string | null;
  lName?: string | null;
  email?: string | null;
  icNo?: number | null;
  phoneNo?: number | null;
  speciality?: WorkerSpeciality | null;
};

export type UpdateJobRequestInput = {
  id: string;
  status?: JobStatus | null;
};

export type UpdateOfferInput = {
  id: string;
  price?: number | null;
};

export type CreateCustomerMutationVariables = {
  createCustomerInput: CreateCustomerInput;
};

export type CreateCustomerMutation = {
  // Put a single value of type 'Post'.
  // If an item exists it's updated. If it does not it's created.
  createCustomer: {
    __typename: "Customer";
    id: string;
    fName: string;
    lName: string;
    email: string;
    phoneNo: string;
    postalZipCode?: string | null;
    jobRequests: Array<{
      __typename: "JobRequest";
      id: string;
      customerId: string;
      city: string;
      status: JobStatus;
      title: string;
      description: string;
      totalCost: number;
      sentAt: string;
      completedAt?: string | null;
    } | null>;
    appointments?: Array<{
      __typename: "Appointment";
      id: string;
      customerId: string;
      workerId: string;
      offerId: string;
      time: string;
      status?: string | null;
    } | null> | null;
  };
};

export type CreateWorkerMutationVariables = {
  createWorkerInput: CreateWorkerInput;
};

export type CreateWorkerMutation = {
  createWorker: {
    __typename: "Worker";
    id: string;
    fName: string;
    lName: string;
    email: string;
    icNo: string;
    phoneNo: string;
    speciality: WorkerSpeciality;
    offers: Array<{
      __typename: "Offer";
      id: string;
      customerId: string;
      workerId: string;
      jobId: string;
      price: number;
      sentAt: string;
      status: OfferStatus;
    } | null>;
    appointments?: Array<{
      __typename: "Appointment";
      id: string;
      customerId: string;
      workerId: string;
      offerId: string;
      time: string;
      status?: string | null;
    } | null> | null;
  };
};

export type CreateJobRequestMutationVariables = {
  createJobRequestInput: CreateJobRequestInput;
};

export type CreateJobRequestMutation = {
  createJobRequest: {
    __typename: "JobRequest";
    id: string;
    customerId: string;
    location: {
      __typename: "Location";
      id: string;
      customerId: string;
      lng: string;
      lat: string;
      state: string;
      city: string;
      address: string;
    };
    city: string;
    status: JobStatus;
    title: string;
    description: string;
    totalCost: number;
    offers?: Array<{
      __typename: "Offer";
      id: string;
      customerId: string;
      workerId: string;
      jobId: string;
      price: number;
      sentAt: string;
      status: OfferStatus;
    } | null> | null;
    sentAt: string;
    completedAt?: string | null;
  };
};

export type CreateOfferMutationVariables = {
  createOfferInput: CreateOfferInput;
};

export type CreateOfferMutation = {
  createOffer: {
    __typename: "Offer";
    id: string;
    customerId: string;
    workerId: string;
    jobId: string;
    price: number;
    sentAt: string;
    status: OfferStatus;
  };
};

export type UpdateCustomerMutationVariables = {
  updateCustomerInput: UpdateCustomerInput;
};

export type UpdateCustomerMutation = {
  updateCustomer: {
    __typename: "Customer";
    id: string;
    fName: string;
    lName: string;
    email: string;
    phoneNo: string;
    postalZipCode?: string | null;
    jobRequests: Array<{
      __typename: "JobRequest";
      id: string;
      customerId: string;
      city: string;
      status: JobStatus;
      title: string;
      description: string;
      totalCost: number;
      sentAt: string;
      completedAt?: string | null;
    } | null>;
    appointments?: Array<{
      __typename: "Appointment";
      id: string;
      customerId: string;
      workerId: string;
      offerId: string;
      time: string;
      status?: string | null;
    } | null> | null;
  };
};

export type UpdateWorkerMutationVariables = {
  updateWorkerInput: UpdateWorkerInput;
};

export type UpdateWorkerMutation = {
  updateWorker: {
    __typename: "Worker";
    id: string;
    fName: string;
    lName: string;
    email: string;
    icNo: string;
    phoneNo: string;
    speciality: WorkerSpeciality;
    offers: Array<{
      __typename: "Offer";
      id: string;
      customerId: string;
      workerId: string;
      jobId: string;
      price: number;
      sentAt: string;
      status: OfferStatus;
    } | null>;
    appointments?: Array<{
      __typename: "Appointment";
      id: string;
      customerId: string;
      workerId: string;
      offerId: string;
      time: string;
      status?: string | null;
    } | null> | null;
  };
};

export type UpdateJobRequestMutationVariables = {
  updateJobRequestInput: UpdateJobRequestInput;
};

export type UpdateJobRequestMutation = {
  updateJobRequest: {
    __typename: "JobRequest";
    id: string;
    customerId: string;
    location: {
      __typename: "Location";
      id: string;
      customerId: string;
      lng: string;
      lat: string;
      state: string;
      city: string;
      address: string;
    };
    city: string;
    status: JobStatus;
    title: string;
    description: string;
    totalCost: number;
    offers?: Array<{
      __typename: "Offer";
      id: string;
      customerId: string;
      workerId: string;
      jobId: string;
      price: number;
      sentAt: string;
      status: OfferStatus;
    } | null> | null;
    sentAt: string;
    completedAt?: string | null;
  };
};

export type UpdateOfferMutationVariables = {
  updateOfferInput: UpdateOfferInput;
};

export type UpdateOfferMutation = {
  updateOffer: {
    __typename: "Offer";
    id: string;
    customerId: string;
    workerId: string;
    jobId: string;
    price: number;
    sentAt: string;
    status: OfferStatus;
  };
};

export type DeleteCustomerMutationVariables = {
  id: string;
};

export type DeleteCustomerMutation = {
  deleteCustomer: {
    __typename: "Customer";
    id: string;
    fName: string;
    lName: string;
    email: string;
    phoneNo: string;
    postalZipCode?: string | null;
    jobRequests: Array<{
      __typename: "JobRequest";
      id: string;
      customerId: string;
      city: string;
      status: JobStatus;
      title: string;
      description: string;
      totalCost: number;
      sentAt: string;
      completedAt?: string | null;
    } | null>;
    appointments?: Array<{
      __typename: "Appointment";
      id: string;
      customerId: string;
      workerId: string;
      offerId: string;
      time: string;
      status?: string | null;
    } | null> | null;
  };
};

export type DeleteWorkerMutationVariables = {
  id: string;
};

export type DeleteWorkerMutation = {
  deleteWorker: {
    __typename: "Worker";
    id: string;
    fName: string;
    lName: string;
    email: string;
    icNo: string;
    phoneNo: string;
    speciality: WorkerSpeciality;
    offers: Array<{
      __typename: "Offer";
      id: string;
      customerId: string;
      workerId: string;
      jobId: string;
      price: number;
      sentAt: string;
      status: OfferStatus;
    } | null>;
    appointments?: Array<{
      __typename: "Appointment";
      id: string;
      customerId: string;
      workerId: string;
      offerId: string;
      time: string;
      status?: string | null;
    } | null> | null;
  };
};

export type DeleteJobRequestMutationVariables = {
  id: string;
};

export type DeleteJobRequestMutation = {
  deleteJobRequest: {
    __typename: "JobRequest";
    id: string;
    customerId: string;
    location: {
      __typename: "Location";
      id: string;
      customerId: string;
      lng: string;
      lat: string;
      state: string;
      city: string;
      address: string;
    };
    city: string;
    status: JobStatus;
    title: string;
    description: string;
    totalCost: number;
    offers?: Array<{
      __typename: "Offer";
      id: string;
      customerId: string;
      workerId: string;
      jobId: string;
      price: number;
      sentAt: string;
      status: OfferStatus;
    } | null> | null;
    sentAt: string;
    completedAt?: string | null;
  };
};

export type DeleteOfferMutationVariables = {
  id: string;
};

export type DeleteOfferMutation = {
  deleteOffer: {
    __typename: "Offer";
    id: string;
    customerId: string;
    workerId: string;
    jobId: string;
    price: number;
    sentAt: string;
    status: OfferStatus;
  };
};

export type CustomerByIdQueryVariables = {
  customerId: string;
};

export type CustomerByIdQuery = {
  // Get a single value of type 'Post' by primary key.
  customerById: {
    __typename: "Customer";
    id: string;
    fName: string;
    lName: string;
    email: string;
    phoneNo: string;
    postalZipCode?: string | null;
    jobRequests: Array<{
      __typename: "JobRequest";
      id: string;
      customerId: string;
      city: string;
      status: JobStatus;
      title: string;
      description: string;
      totalCost: number;
      sentAt: string;
      completedAt?: string | null;
    } | null>;
    appointments?: Array<{
      __typename: "Appointment";
      id: string;
      customerId: string;
      workerId: string;
      offerId: string;
      time: string;
      status?: string | null;
    } | null> | null;
  };
};

export type WorkerByIdQueryVariables = {
  workerId: string;
};

export type WorkerByIdQuery = {
  workerById: {
    __typename: "Worker";
    id: string;
    fName: string;
    lName: string;
    email: string;
    icNo: string;
    phoneNo: string;
    speciality: WorkerSpeciality;
    offers: Array<{
      __typename: "Offer";
      id: string;
      customerId: string;
      workerId: string;
      jobId: string;
      price: number;
      sentAt: string;
      status: OfferStatus;
    } | null>;
    appointments?: Array<{
      __typename: "Appointment";
      id: string;
      customerId: string;
      workerId: string;
      offerId: string;
      time: string;
      status?: string | null;
    } | null> | null;
  };
};

export type JobByIdQueryVariables = {
  jobId: string;
};

export type JobByIdQuery = {
  jobById: {
    __typename: "JobRequest";
    id: string;
    customerId: string;
    location: {
      __typename: "Location";
      id: string;
      customerId: string;
      lng: string;
      lat: string;
      state: string;
      city: string;
      address: string;
    };
    city: string;
    status: JobStatus;
    title: string;
    description: string;
    totalCost: number;
    offers?: Array<{
      __typename: "Offer";
      id: string;
      customerId: string;
      workerId: string;
      jobId: string;
      price: number;
      sentAt: string;
      status: OfferStatus;
    } | null> | null;
    sentAt: string;
    completedAt?: string | null;
  };
};

export type OfferByIdQueryVariables = {
  offerId: string;
};

export type OfferByIdQuery = {
  offerById: {
    __typename: "Offer";
    id: string;
    customerId: string;
    workerId: string;
    jobId: string;
    price: number;
    sentAt: string;
    status: OfferStatus;
  };
};

export type JobsByCustomerIdQueryVariables = {
  customerId: string;
};

export type JobsByCustomerIdQuery = {
  jobsByCustomerId: Array<{
    __typename: "JobRequest";
    id: string;
    customerId: string;
    location: {
      __typename: "Location";
      id: string;
      customerId: string;
      lng: string;
      lat: string;
      state: string;
      city: string;
      address: string;
    };
    city: string;
    status: JobStatus;
    title: string;
    description: string;
    totalCost: number;
    offers?: Array<{
      __typename: "Offer";
      id: string;
      customerId: string;
      workerId: string;
      jobId: string;
      price: number;
      sentAt: string;
      status: OfferStatus;
    } | null> | null;
    sentAt: string;
    completedAt?: string | null;
  } | null>;
};

export type OffersByCustomerIdQueryVariables = {
  customerId?: string | null;
};

export type OffersByCustomerIdQuery = {
  offersByCustomerId: Array<{
    __typename: "Offer";
    id: string;
    customerId: string;
    workerId: string;
    jobId: string;
    price: number;
    sentAt: string;
    status: OfferStatus;
  } | null>;
};

export type JobsByWorkerIdQueryVariables = {
  workerId: string;
};

export type JobsByWorkerIdQuery = {
  jobsByWorkerId: Array<{
    __typename: "JobRequest";
    id: string;
    customerId: string;
    location: {
      __typename: "Location";
      id: string;
      customerId: string;
      lng: string;
      lat: string;
      state: string;
      city: string;
      address: string;
    };
    city: string;
    status: JobStatus;
    title: string;
    description: string;
    totalCost: number;
    offers?: Array<{
      __typename: "Offer";
      id: string;
      customerId: string;
      workerId: string;
      jobId: string;
      price: number;
      sentAt: string;
      status: OfferStatus;
    } | null> | null;
    sentAt: string;
    completedAt?: string | null;
  } | null>;
};

export type OffersByWorkerIdQueryVariables = {
  workerId: string;
};

export type OffersByWorkerIdQuery = {
  offersByWorkerId: Array<{
    __typename: "Offer";
    id: string;
    customerId: string;
    workerId: string;
    jobId: string;
    price: number;
    sentAt: string;
    status: OfferStatus;
  } | null>;
};
