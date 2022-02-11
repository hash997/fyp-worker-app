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
    case "update":
      if (!action.payload) throw new Error("payload is empty");

      return (currentJob = action.payload);
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

      const nearByJobs: any = await API.graphql({
        query: jobsByCityAndSpeciality,

        variables: {
          city: user.city,
          speciality: user.speciality,
        },
      });

      dispatch({
        type: "update",
        payload: {
          ...currentJobs,
          nearybyJobs: nearByJobs.data.jobsByCityAndSpeciality,
          jobToWorker: jobsToWorker.data.jobsToWorkerByWorkerId,
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

    console.log("userID => ", user.id);
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
