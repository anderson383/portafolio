import {
  ContentFulRepository, PageData
} from '@/services/repositories/contentful.repository';
import {
  GetStaticPaths, GetStaticProps
} from 'next';
import {
  useEffect, useState
} from 'react';
import Factory from '@/components/features/factory/factory';
import PageHead from '@/components/features/page-head/page-head';
import { PublicLayout } from '@/components/layouts';
import { repositoryContainer } from '@/services/inversify.conf';
import { TYPES } from '@/services/types';
import { useRepositoryIoc } from '@/services/context';
import { ScrollContainer } from 'react-scroll-motion';

export interface PageProps {
  data: PageData;
  locale: string;
}

const Page = ({
  data, locale
}:PageProps) => {
  const { container } = useRepositoryIoc();

  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return mount ? (
    <>
      <PageHead
        titleSeo={data.titleSeo}
        metaDescription={data.metaDescription}
        imagenSeo={data.imagenSeo.fields.file.url}
        relCanonical=""
      />
      <PublicLayout
        headerData={data.header}
      >
        <ScrollContainer>
          {
            data.content.map((item, index) => (
              <Factory
                key={index}
                component={item}
                locale={locale}
              />
            ))
          }
        </ScrollContainer>
      </PublicLayout>
    </>
  ) : <></>;
};

export const getStaticProps: GetStaticProps = async ({
  params, locale
}) => {
  const contentfulRepository: ContentFulRepository = repositoryContainer.get(TYPES.CONTENTFUL_REPOSITORY);

  const localeMap: any = {
    en: 'en-US',
    es: 'es-CO'
  };

  const para = {
    locale: localeMap[locale],
    pageSlug: `/${ params.slug instanceof Array ? params.slug.join('/') : params.slug }`
  };

  const data = await contentfulRepository.getPageData(para);

  return {props: {
    data,
    locale
  }};
};

export const getStaticPaths:GetStaticPaths = async ({ locales }) => {
  const contentfulRepository: ContentFulRepository = repositoryContainer.get(TYPES.CONTENTFUL_REPOSITORY);

  const allPaths = await contentfulRepository.getAllSlugs();

  const paths
    = allPaths
      ?.map((slug: any) => [
        {
          locale: 'en',
          params: { slug: slug?.slug['en-US']?.replace('/', '').split('/') }
        },
        {
          locale: 'es',
          params: { slug: slug?.slug['es-CO']?.replace('/', '').split('/') }
        }
      ])
      .flat() ?? [];

  return {
    fallback: false,
    paths: paths
  };
};
export default Page;
