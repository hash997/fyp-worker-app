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
      phoneNo
      icNo
      speciality
      hourlyRate
      city
      lat
      lng
      isActive
      appointments {
        customerId
        id
        offerId
        status
        time
        workerId
      }
      offers {
        id
        jobId
        customerId
        workerId
        sentAt
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

export const jobsByCityAndSpeciality = /* GraphQL */ `
  query jobsByCityAndSpeciality(
    $city: String!
    $speciality: WorkerSpeciality!
  ) {
    jobsByCityAndSpeciality(city: $city, speciality: $speciality) {
      id
      city
      completedAt
      customerId
      description
      location {
        address
        city
        customerId
        id
        lat
        lng
        state
      }
      offers {
        id
        customerId
        jobId
        price
        sentAt
        status
        suggestedTime
        workerId
      }
      sentAt
      speciality
      status
      totalCost
      title
    }
  }
`;

export const jobsToWorkerByWorkerId = /* GraphQL */ `
  query JobsToWorkerByWorkerId($workerId: ID!) {
    jobsToWorkerByWorkerId(workerId: $workerId) {
      id
      customerId
      location {
        id
        lng
        lat
        city
      }
      customer {
        fName
        lName
      }
      worker {
        hourlyRate
        fName
        lName
        speciality
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
      suggestedTime
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
      jobRequest
    }
  }
`;
