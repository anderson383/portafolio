import '@/styles/styles.scss';
import 'normalize.css/normalize.css';
import type { AppProps } from 'next/app';
import { RepositoryIocProvider } from '@/services/context';

export default function App({
  Component, pageProps
}: AppProps) {
  return <RepositoryIocProvider>
    <Component {...pageProps} />
  </RepositoryIocProvider>;
}
