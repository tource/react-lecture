import axios from "axios";
import { IPhoto } from "../../types/todo";
const photoURL = "https://jsonplaceholder.typicode.com/photos/";

// 목록 1개
export const getPhoto = async (id: number): Promise<IPhoto> => {
  try {
    const res = await axios.get(`${photoURL}${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 전체 목록
export const getPhotos = async (): Promise<IPhoto[]> => {
  try {
    const res = await axios.get(photoURL);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 자료 1개 추가
export const postPhoto = async ({
  title,
  url,
  thumbnailUrl,
}: IPhoto): Promise<IPhoto> => {
  try {
    const res = await axios.post(photoURL, { title, url, thumbnailUrl });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const putPhoto = async (
  id: number,
  { title, url, thumbnailUrl }: IPhoto,
): Promise<IPhoto> => {
  try {
    const res = await axios.put(`${photoURL}${id}`, {
      title,
      url,
      thumbnailUrl,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const patchPhoto = async (
  id: number,
  { title }: IPhoto,
): Promise<IPhoto> => {
  try {
    const res = await axios.patch(`${photoURL}${id}`, { title });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deletePhoto = async (id: number): Promise<IPhoto> => {
  try {
    const res = await axios.delete(`${photoURL}${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
