const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

type QueryParams = Record<string, string | number | boolean | undefined | null>;

const buildUrl = (path: string, queryParams?: QueryParams): string => {
  const url = `${API_BASE_URL}${path}`;
  if (!queryParams || Object.keys(queryParams).length === 0) return url;

  const queryString = Object.entries(queryParams)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join("&");

  return `${url}?${queryString}`;
};

export const API_ENDPOINTS = {
  users: {
    register: () => buildUrl("/users/register"),
    login: () => buildUrl("/users/login"),
  },
};
