/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {
    createCustomer(createCustomerInput: $createCustomerInput) {
      id
      fName
      lName
      email
      # phoneNo
      # postalZipCode
      # jobRequests {
      #   id
      #   customerId
      #   city
      #   status
      #   title
      #   description
      #   totalCost
      #   sentAt
      #   completedAt
      # }
      # appointments {
      #   id
      #   customerId
      #   workerId
      #   offerId
      #   time
      #   status
      # }
    }
  }
`;
export const createWorker = /* GraphQL */ `
  mutation CreateWorker($createWorkerInput: CreateWorkerInput!) {
    createWorker(createWorkerInput: $createWorkerInput) {
      id
      fName
      lName
      email
      icNo
      phoneNo
      speciality
      # offers {
      #   id
      #   customerId
      #   workerId
      #   jobId
      #   price
      #   sentAt
      #   status
      # }
      # appointments {
      #   id
      #   customerId
      #   workerId
      #   offerId
      #   time
      #   status
      # }
    }
  }
`;
export const createJobRequest = /* GraphQL */ `
  mutation CreateJobRequest($createJobRequestInput: CreateJobRequestInput!) {
    createJobRequest(createJobRequestInput: $createJobRequestInput) {
      id
      customerId
      location {
        id
        customerId
        lng
        lat
        state
        city
        address
      }
      city
      status
      title
      description
      totalCost
      offers {
        id
        customerId
        workerId
        jobId
        price
        sentAt
        status
      }
      sentAt
      completedAt
    }
  }
`;
export const createOffer = /* GraphQL */ `
  mutation CreateOffer($createOfferInput: CreateOfferInput!) {
    createOffer(createOfferInput: $createOfferInput) {
      id
      customerId
      workerId
      jobId
      price
      sentAt
      status
    }
  }
`;
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer($updateCustomerInput: UpdateCustomerInput!) {
    updateCustomer(updateCustomerInput: $updateCustomerInput) {
      id
      fName
      lName
      email
      phoneNo
      postalZipCode
      jobRequests {
        id
        customerId
        city
        status
        title
        description
        totalCost
        sentAt
        completedAt
      }
      appointments {
        id
        customerId
        workerId
        offerId
        time
        status
      }
    }
  }
`;
export const updateWorker = /* GraphQL */ `
  mutation UpdateWorker($updateWorkerInput: UpdateWorkerInput!) {
    updateWorker(updateWorkerInput: $updateWorkerInput) {
      id
      fName
      lName
      email
      icNo
      phoneNo
      isActive
      speciality
      # offers {
      #   id
      #   customerId
      #   workerId
      #   jobId
      #   price
      #   sentAt
      #   status
      # }
      # appointments {
      #   id
      #   customerId
      #   workerId
      #   offerId
      #   time
      #   status
      # }
    }
  }
`;
export const updateJobRequest = /* GraphQL */ `
  mutation UpdateJobRequest($updateJobRequestInput: UpdateJobRequestInput!) {
    updateJobRequest(updateJobRequestInput: $updateJobRequestInput) {
      id
      customerId
      location {
        id
        customerId
        lng
        lat
        state
        city
        address
      }
      city
      status
      title
      description
      totalCost
      offers {
        id
        customerId
        workerId
        jobId
        price
        sentAt
        status
      }
      sentAt
      completedAt
    }
  }
`;
// updateJobRequestToWorker(updateJobReqestToWorkerInput: {id: "", status: ACCEPTED}) {
//   completedAt
//   customerId
//   description
// }
export const updateJobRequestToWorker = /* GraphQL */ `
  mutation updateJobRequestToWorker(
    $updateJobReqestToWorkerInput: UpdateJobRequestToWorkerInput!
  ) {
    updateJobRequestToWorker(
      updateJobReqestToWorkerInput: $updateJobReqestToWorkerInput
    ) {
      id
      customerId
      location {
        id
        lng
        lat
        city
      }
      description
      title
      sentAt
      status
      totalCost
      workerId
      completedAt
      time
    }
  }
`;
export const updateOffer = /* GraphQL */ `
  mutation UpdateOffer($updateOfferInput: UpdateOfferInput!) {
    updateOffer(updateOfferInput: $updateOfferInput) {
      id
      customerId
      workerId
      jobId
      price
      sentAt
      status
    }
  }
`;
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      id
      fName
      lName
      email
      phoneNo
      postalZipCode
      jobRequests {
        id
        customerId
        city
        status
        title
        description
        totalCost
        sentAt
        completedAt
      }
      appointments {
        id
        customerId
        workerId
        offerId
        time
        status
      }
    }
  }
`;
export const deleteWorker = /* GraphQL */ `
  mutation DeleteWorker($id: ID!) {
    deleteWorker(id: $id) {
      id
      fName
      lName
      email
      icNo
      phoneNo
      speciality
      offers {
        id
        customerId
        workerId
        jobId
        price
        sentAt
        status
      }
      appointments {
        id
        customerId
        workerId
        offerId
        time
        status
      }
    }
  }
`;
export const deleteJobRequest = /* GraphQL */ `
  mutation DeleteJobRequest($id: ID!) {
    deleteJobRequest(id: $id) {
      id
      customerId
      location {
        id
        customerId
        lng
        lat
        state
        city
        address
      }
      city
      status
      title
      description
      totalCost
      offers {
        id
        customerId
        workerId
        jobId
        price
        sentAt
        status
      }
      sentAt
      completedAt
    }
  }
`;
export const deleteOffer = /* GraphQL */ `
  mutation DeleteOffer($id: ID!) {
    deleteOffer(id: $id) {
      id
      customerId
      workerId
      jobId
      price
      sentAt
      status
    }
  }
`;
