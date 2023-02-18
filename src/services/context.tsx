import React, {
  createContext,
  useContext
} from 'react';
import { Container } from 'inversify';
import { repositoryContainer } from './inversify.conf';

const RepositoryIocContext = createContext(null);

type RepositoryIocProviderProps = {
  container?: Container
  children: JSX.Element,
};

export const RepositoryIocProvider = ({
  container,
  children
}: RepositoryIocProviderProps) => {
  const value = { container: container || repositoryContainer };

  return <RepositoryIocContext.Provider value={value}>{children}</RepositoryIocContext.Provider>;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRepositoryIoc = () => useContext(RepositoryIocContext);
