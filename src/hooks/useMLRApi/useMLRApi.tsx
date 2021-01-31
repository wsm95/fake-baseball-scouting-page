import useFetch from "use-http";

export const useMLRApi = <T,>(apiVerson: string = "v1") => {
  return useFetch<T>(`https://redditball.com/api/${apiVerson}`);
};
