import { useState, useEffect } from "react";

export const useBearerToken = (endpoint, token) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const options = {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    };

    fetch(endpoint, options)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [endpoint, token]);

  return { data, error, isLoading };
};
