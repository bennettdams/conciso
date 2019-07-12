import React, { createContext, useReducer, useContext } from "react";
import IPost from "../../types/IPost";

type Action =
  | { type: "update_username"; username: string }
  | { type: "update_name"; name: string }
  | { type: "set_description"; description: string }
  | { type: "set_posts"; posts: IPost[] }
  | { type: "set_comments"; comments: string[] }
  | { type: "set_reach"; reach: number }
  | { type: "set_location"; location: string }
  | { type: "set_created"; created: string }
  | { type: "set_profileViews"; profileViews: number }
  | { type: "set_lastSeen"; lastSeen: string };
type Dispatch = (action: Action) => void;

interface State {
  username: string;
  name: string;
  description: string;
  posts: IPost[];
  comments: string[];
  reach: number;
  location: string;
  created: string;
  profileViews: number;
  lastSeen: string;
}

interface ProfileProviderProps {
  children: React.ReactNode;
}

const ProfileStateContext = createContext<State | undefined>(undefined);
const ProfileDispatchContext = createContext<Dispatch | undefined>(undefined);

function profileReducer(state: State, action: Action) {
  switch (action.type) {
    case "update_username": {
      return { ...state, username: action.username };
    }
    case "update_name": {
      return { ...state, name: action.name };
    }
    default: {
      throw new Error("Unhandled action type: " + action);
    }
  }
}

const initialState: State = {
  username: "Username",
  name: "Name",
  description: "Descr",
  posts: [],
  comments: [],
  reach: 666,
  location: "Germany",
  created: "01.01.2019",
  profileViews: 2019,
  lastSeen: "now"
};

function ProfileProvider({ children }: ProfileProviderProps) {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  return (
    <ProfileStateContext.Provider value={state}>
      <ProfileDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileStateContext.Provider>
  );
}

function useProfileState() {
  const context = useContext(ProfileStateContext);
  if (context === undefined) {
    throw new Error("useProfileState must be used within a ProfileProvider");
  }
  return context;
}

function useProfileDispatch() {
  const context = useContext(ProfileDispatchContext);
  if (context === undefined) {
    throw new Error("useProfileDispatch must be used within a ProfileProvider");
  }
  return context;
}

export { ProfileProvider, useProfileState, useProfileDispatch };
