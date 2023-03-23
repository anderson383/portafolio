import {
  ContentFulRepository, PageData
} from '@/services/repositories/contentful.repository';
import {
  useEffect, useState
} from 'react';
import Factory from '@/components/features/factory/factory';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import PageHead from '@/components/features/page-head/page-head';
import { PublicLayout } from '@/components/layouts';
import { repositoryContainer } from '@/services/inversify.conf';
import { TYPES } from '@/services/types';
import Page from './[...slug]';

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
    en: '/',
    es: '/'
  });

  return {props: {
    data,
    locale
  } };
};

export default Index;

