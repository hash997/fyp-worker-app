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

// query MyQuery {
//   jobsByCityAndSpeciality(city: "Cyberjaya", speciality: DRIVER) {
//     city
//     completedAt
//     customerId
//     description
//     id
//     sentAt
//     speciality
//     status
//     title
//     totalCost
//     location {
//       address
//       city
//       customerId
//       lat
//       id
//       lng
//       state
//     }
//   }
// }

export const jobsByCityAndSpeciality = /* GraphQL */ `
  query jobsByCityAndSpeciality(
    $city: String!
    $speciality: WorkerSpeciality!
  ) {
    jobsByCityAndSpeciality(city: $city, speciality: $speciality) {
      city
      completedAt
      customerId
      description
      id
      sentAt
      speciality
      status
      title
      totalCost
      location {
        address
        city
        customerId
        lat
        id
        lng
        state
      }
    }
  }
`;

export const jobsToWorkerByWorkerId = /* GraphQL */ `
  query JobsToWorkerByWorkerId($workerId: ID!) {
    jobsToWorkerByWorkerId(workerId: $workerId) {
      id
      customerId
      description
      title
      sentAt
      status
      totalCost
      workerId
      completedAt
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
      jobRequest
    }
  }
`;
