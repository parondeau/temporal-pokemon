import { FetchStatus } from '@tanstack/react-query';

export const DefaultLoadingComponent = ({
  fetchStatus,
}: {
  fetchStatus: FetchStatus;
}) => {
  if (fetchStatus === 'idle') {
    return null;
  }
  return <div>Loading...</div>;
};
