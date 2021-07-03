import { Route, RouteProps, Redirect } from "react-router";

export interface IGuardedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

export default function GuardedRoute({isAuthenticated, authenticationPath, ...routeProps}: IGuardedRouteProps) {
  if(isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: authenticationPath }} />;
  }
};