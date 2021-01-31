import useFetch from "use-http";

export const useMLRApi = () => {
  return useFetch("https://redditball.com/api/v1");
};
