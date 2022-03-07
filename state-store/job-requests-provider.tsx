import { API } from "aws-amplify";
import React, { Dispatch, Reducer, useEffect, useState } from "react";
import { useReducer, useContext, createContext } from "react";
import { JobRequest, JobRequestToWorker } from "../src/API";
import {
  jobsByCityAndSpeciality,
  jobsToWorkerByWorkerId,
} from "../src/graphql/queries";
import {
  onJobCreated,
  onJobToWorkerCreatedSubcription,
} from "../src/graphql/subscriptions";
import { Appointment } from "../types/gqlTypes";
import { useAuth } from "./auth-state";

export interface NearByJobs {
  nearybyJobs: JobRequest[] | [];
  jobToWorker: JobRequestToWorker[] | [];
}

const initialState: NearByJobs = {
  nearybyJobs: [],
  jobToWorker: [],
};

export enum ActionType {
  ADD_TO_NEARBY_JOBS = "ADD_TO_NEARBY_JOBS",
  ADD_TO_WORKER_JOBS = "ADD_TO_WORKER_JOBS",
}

interface Action {
  type: string;
  payload?: NearByJobs;
}

const JobRequestStateContext = createContext(initialState);
const JobRequestDispatchContext = createContext<Dispatch<Action>>(
  {} as Dispatch<Action>
);

const reducer = (currentJob: NearByJobs, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_TO_NEARBY_JOBS:
      if (!action.payload) throw new Error("payload is empty");

      return { ...currentJob, nearybyJobs: action.payload.nearybyJobs };
    case ActionType.ADD_TO_WORKER_JOBS:
      if (!action.payload) throw new Error("payload is empty");

      return { ...currentJob, jobToWorker: action.payload?.jobToWorker };

    case "clear":
      return (currentJob = initialState);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const JobRequestProvider: React.FC = ({ children }) => {
  const [currentJobs, dispatch] = useReducer(reducer, initialState);
  const { user, isActive } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const [isLoading, setIsLoading] = useState({
    gettingLocation: false,
    gettingJobs: false,
  });

  const getJobs = async () => {
    setIsLoading({ ...isLoading, gettingJobs: true });

    try {
      if (!isActive) {
        setErrorMsg(
          "You are not active at the moment. Switch on your account to receive jobs"
        );
        setIsLoading({ ...isLoading, gettingJobs: false });
        return;
      }
      if (!user) {
        setErrorMsg("user is undefined");
        setIsLoading({ ...isLoading, gettingJobs: false });
        return;
      }

      if (!user) {
        setErrorMsg("user is undefined");
        setIsLoading({ ...isLoading, gettingJobs: false });
        return;
      }

      const jobsToWorker: any = await API.graphql({
        query: jobsToWorkerByWorkerId,
        variables: { workerId: user.id },
      });

      dispatch({
        type: ActionType.ADD_TO_WORKER_JOBS,
        payload: {
          ...currentJobs,
          jobToWorker: jobsToWorker.data.jobsToWorkerByWorkerId,
        },
      });

      const nearByJobs: any = await API.graphql({
        query: jobsByCityAndSpeciality,

        variables: {
          city: user.city,
          speciality: user.speciality,
        },
      });

      dispatch({
        type: ActionType.ADD_TO_NEARBY_JOBS,
        payload: {
          ...currentJobs,
          nearybyJobs: nearByJobs.data.jobsByCityAndSpeciality,
        },
      });
      setIsLoading({ ...isLoading, gettingJobs: false });
    } catch (error) {
      setIsLoading({ ...isLoading, gettingJobs: false });

      setErrorMsg("Error getting nearby jobs");
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    getJobs();
  }, [user, isActive]);
  return (
    <JobRequestDispatchContext.Provider value={dispatch}>
      <JobRequestStateContext.Provider value={currentJobs}>
        {children}
      </JobRequestStateContext.Provider>
    </JobRequestDispatchContext.Provider>
  );
};

export const useJobRequest = () => useContext(JobRequestStateContext);
export const useDispatchJobRequest = () =>
  useContext(JobRequestDispatchContext);
