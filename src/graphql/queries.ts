/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const customerById = /* GraphQL */ `
  query CustomerById($customerId: ID!) {
    customerById(customerId: $customerId) {
      id
      fName
      lName
      email
      phoneNo
      postalZipCode
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
export const workerById = /* GraphQL */ `
  query WorkerById($workerId: ID!) {
    workerById(workerId: $workerId) {
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
export const jobById = /* GraphQL */ `
  query JobById($jobId: ID!) {
    jobById(jobId: $jobId) {
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
export const offerById = /* GraphQL */ `
  query OfferById($offerId: ID!) {
    offerById(offerId: $offerId) {
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
export const jobsByCustomerId = /* GraphQL */ `
  query JobsByCustomerId($customerId: ID!) {
    jobsByCustomerId(customerId: $customerId) {
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
export const offersByCustomerId = /* GraphQL */ `
  query OffersByCustomerId($customerId: ID) {
    offersByCustomerId(customerId: $customerId) {
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
export const jobsByWorkerId = /* GraphQL */ `
  query JobsByWorkerId($workerId: ID!) {
    jobsByWorkerId(workerId: $workerId) {
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
export const offersByWorkerId = /* GraphQL */ `
  query OffersByWorkerId($workerId: ID!) {
    offersByWorkerId(workerId: $workerId) {
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
