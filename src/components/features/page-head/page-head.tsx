import Head from 'next/head';

interface PageHeadProps {
    titleSeo: string | null;
    metaDescription: string;
    relCanonical: string;
    imagenSeo: string;
}

export const PageHead:React.FC<PageHeadProps> = props => {
  const {
    titleSeo, imagenSeo, relCanonical, metaDescription
  } = props;

  return (
    <>
      <Head>
        <title>{titleSeo || ''}</title>
        <meta name="title" content={titleSeo || ''} />
        <meta name="description" content={metaDescription || ''} />
        <meta name="author" content="Cámara de Comercio de Bogotá" />
        <meta property="og:title" content="Cámara de Comercio de Bogotá" />
        <meta property="og:description" content={metaDescription || ''} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={imagenSeo} />

        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default PageHead;
