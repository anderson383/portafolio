import {
  ContentFulRepository, PageData
} from '@/services/repositories/contentful.repository';
import { GetStaticProps } from 'next';
import { Inter } from '@next/font/google';
import Page from './[...slug]';
import { repositoryContainer } from '@/services/inversify.conf';
import { TYPES } from '@/services/types';

export interface PageProps {
  data: PageData;
  locale: string;
}

const inter = Inter({ subsets: ['latin'] });

const Index = ({
  data, locale
}:PageProps) => {
  return <Page data={data} locale={locale} />;
};

export const getStaticSlugPageData = async (locale: string, slugs : {en: string, es: string}) => {
  const contentfulRepository: ContentFulRepository = repositoryContainer.get(
    TYPES.CONTENTFUL_REPOSITORY
  );

  const localeMap: any = {
    en: 'en-US',
    es: 'es-CO'
  };
  const slugMap: any = {
    en: slugs.en,
    es: slugs.es
  };
  const queryParams = {
    locale: localeMap[locale],
    pageSlug: slugMap[locale]
  };

  return contentfulRepository.getPageData(queryParams);
};

export const getStaticProps: GetStaticProps = async ({
  params, locale
}) => {
  const data = await getStaticSlugPageData(locale, {
    en: '/en',
    es: '/es'
  });

  return {props: {
    data,
    locale
  } };
};

export default Index;

