import { useMemo } from 'react';
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { parse } from 'query-string';

export const useCommonProps = () => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const params = useParams();

  return useMemo(
    () => ({
      // For convenience add push(), replace(), pathname at top level
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      history,
      historyBack: (amount: number) => history.go(amount || -1),
      historyPush: history.push,
      historyReplace: history.replace,
      location,
      match,
      params,
      pathname: location.pathname,
      query: parse(location.search),
      search: location.search,
    }),
    [params, match, location, history]
  );
};

export default useCommonProps;
