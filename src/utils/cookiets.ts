/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cookies } from "react-cookie";

const cookies: Cookies = new Cookies();
interface CookieSetOptions {
  path?: string;
  expire?: Date;
  maxAge?: number;
  [key: string]: any;
}
export const setCookie = (
  name: string,
  value: any,
  options?: CookieSetOptions,
) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string): any => {
  return cookies.get(name);
};

export const removeCookie = (name: string): void => {
  return cookies.remove(name, { path: "/" });
};
