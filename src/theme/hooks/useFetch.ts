import { useState } from "react";

export function useFetch() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return { data, isLoading };
}
