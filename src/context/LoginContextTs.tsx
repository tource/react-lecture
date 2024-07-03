import { Dispatch, SetStateAction, createContext } from "react";
import { UserInfo } from "../types/UserInfo";

interface LoginContextProps {
  userInfo: UserInfo | null;
  userLang: string | null;
  setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
  setUserLang: Dispatch<SetStateAction<string | null>>;
}

export const LoginContext = createContext<LoginContextProps | null>(null);
