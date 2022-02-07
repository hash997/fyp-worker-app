import React, { Dispatch, Reducer } from "react";
import { useReducer, useContext, createContext } from "react";
import { JobRequest, JobRequestState } from "../job-request-types";

const initialState: JobRequestState = {
  currentStep: 0,
  // job: undefined,
} as JobRequestState;
interface Action {
  type: string;
  payload?: JobRequestState;
}

const JobRequestStateContext = createContext(initialState);
const JobRequestDispatchContext = createContext<Dispatch<Action>>(
  {} as Dispatch<Action>
);

const reducer = (currentJob: JobRequestState, action: Action) => {
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
