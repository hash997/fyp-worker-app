export const onJobCreated = /* GraphQL */ `
  subscription onJobCreated($city: String!, $speciality: WorkerSpeciality!) {
    onJobCreated(city: $city, speciality: $speciality) {
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

export const onJobToWorkerCreatedSubcription = /* GraphQL */ `
  subscription onJobToWorkerCreated($workerId: ID!) {
    onJobToWorkerCreated(workerId: $workerId) {
      id
      customerId
      workerId
      location {
        id
        customerId
        lng
        lat
        state
        city
        address
      }
      # city
      status
      title
      description
    }
  }
`;
