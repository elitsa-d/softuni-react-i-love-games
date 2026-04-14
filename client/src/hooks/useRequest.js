import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const baseUrl = "http://localhost:3030";

export default function useRequest() {
  const { user, isAuthenticated } = useContext(UserContext);
  console.log(isAuthenticated);
  const request = async (url, method, data) => {
    let options = {};

    if (method) {
      options.method = method;
    }

    if (data) {
      options.headers = {
        "Content-Type": "application/json",
      };

      options.body = JSON.stringify(data);
    }

    if (user?.accessToken) {
      options.headers = {
        ...options.headers,
        "X-Authorization": user.accessToken,
      };
    }

    const response = await fetch(`${baseUrl}${url}`, options);

    if (!response.ok) {
      throw result;
    }

    if (response.status === 204) {
      return {};
    }

    const result = await response.json();

    return result;
  };

  return {
    request,
  };
}
