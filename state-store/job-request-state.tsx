import React, { Dispatch, Reducer } from "react";
import { useReducer, useContext, createContext } from "react";
import { Appointment } from "../types/gqlTypes";
import { JobRequest, JobRequestState } from "../types/job-request-types";

export interface Jobs {
  jobs: JobRequest[] | [];
  acceptedJobs: JobRequest[] | [];
  appoitments: Appointment | [];
}

const initialState: Jobs = {
  jobs: [],
  acceptedJobs: [],
  appoitments: [],
} as Jobs;
interface Action {
  type: string;
  payload?: Jobs;
}

const JobRequestStateContext = createContext(initialState);
const JobRequestDispatchContext = createContext<Dispatch<Action>>(
  {} as Dispatch<Action>
);

const reducer = (currentJob: Jobs, action: Action) => {
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
  const [currentInquiry, dispatch] = useReducer(reducer, initialState);
  return (
    <JobRequestDispatchContext.Provider value={dispatch}>
      <JobRequestStateContext.Provider value={currentInquiry}>
        {children}
      </JobRequestStateContext.Provider>
    </JobRequestDispatchContext.Provider>
  );
};

export const useJobRequest = () => useContext(JobRequestStateContext);
export const useDispatchJobRequest = () =>
  useContext(JobRequestDispatchContext);
