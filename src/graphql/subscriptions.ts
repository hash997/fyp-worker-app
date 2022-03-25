export const onJobCreated = /* GraphQL */ `
  subscription onJobCreated($city: String!, $speciality: WorkerSpeciality!) {
    onJobCreated(city: $city, speciality: $speciality) {
      id
      city
      completedAt
      customerId
      description
      preferedTime
      isUrgent
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

export const onJobToWorkerCreatedSubcription = /* GraphQL */ `
  subscription onJobToWorkerCreated($workerId: ID!) {
    onJobToWorkerCreated(workerId: $workerId) {
      id
      customerId
      time
      location {
        id
        lng
        lat
        city
      }
      # customer {
      #   fName
      #   lName
      # }
      # worker {
      #   hourlyRate
      #   fName
      #   lName
      #   speciality
      # }
      description
      title
      # sentAt
      status
      # totalCost
      workerId
      completedAt
      # time
    }
  }
`;

export const onJobUpdated = /* GraphQL */ `
  subscription onJobUpdated($workerId: ID!) {
    onJobUpdated(workerId: $workerId) {
      id
      city
      completedAt
      customerId
      description
      preferedTime
      isUrgent
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
