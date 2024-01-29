import type { UseFetchOptions } from "nuxt/app";

export default async function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const url = process.server ? 'http://127.0.0.1:8000' : 'http://localhost:8000';
  let headers: any = {
    'Accept': 'application/json',
    'referer': 'http://localhost:3000',
  };
  
  const token = useCookie('XSRF-TOKEN');

  if (token.value) {
    headers['X-XSRF-TOKEN'] = token.value;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["referer", "cookie"]),
    }
  }

  console.log(headers);

  return useFetch(url + path, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    }
  })
}
