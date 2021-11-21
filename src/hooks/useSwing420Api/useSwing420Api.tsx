import useFetch from "use-http";

export const useSwing420Api = <T,>() => {
  return useFetch<T>(`https://swing420.com/api`);
};
