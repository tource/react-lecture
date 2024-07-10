import React, { Dispatch, createContext, useEffect, useReducer } from "react";
interface Item {
  pk: number;
  goodname: string;
}
interface State {
  bucket: Item[];
}
const initialState: State = { bucket: [] };

interface BucketAction {
  type: string;
  payload: Item[];
}

const bucketReducer = (state: State, action: BucketAction): State => {
  switch (action.type) {
    case "SET_BUCKET":
      return { ...state, bucket: action.payload };
    default:
      return state;
  }
};

interface BucketContextProps {
  state: State;
  dispatch: Dispatch<BucketAction>;
}
export const BucketContext = createContext<BucketContextProps | null>(null);

interface BucketProviderTsProps {
  children: React.ReactNode;
}
const BucketProviderTs: React.FC<BucketProviderTsProps> = ({ children }) => {
  const [state, dispatch] = useReducer(bucketReducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_BUCKET", payload: [] });
  }, []);

  return (
    <BucketContext.Provider value={{ state, dispatch }}>
      {children}
    </BucketContext.Provider>
  );
};

export default BucketProviderTs;
