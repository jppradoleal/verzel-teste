import { createContext } from "react";

const LoadingContext = createContext({
  isLoading: false,
  setLoading: (loading: boolean) => {}
});

export default LoadingContext;