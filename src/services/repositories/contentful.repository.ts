import { Entry } from 'contentful';

export type ImageDetailsFile = {
  width: number ;
  height: number;
};

export type DetailsFile = {
  image: ImageDetailsFile;
  size: number;
};

export type File = {
  contentType: string;
  details: DetailsFile;
  fileName: string;
  url: string;
};

export type GetPageParams = {
  pageSlug: string;
  locale: string;
};

export type Image = {
  fields: {
    description: string;
    file: File;
    title: string;
  };
};

export type PageData = {
  slug: string;
  relCanonical: string;
  titleSeo: string;
  metaDescription: string;
  imagenSeo?: Image;

  // header: Header;
  // keywordsSeo: string[];
  content?: Entry<unknown>[];

  // footer?: FooterProps;
  // menuData?: MainMenuDataObject[];
  pageId?: string;
  theme?: string;
};

export interface IPageFields {
  slug: string;
  macrosection_subsection: string;
}

export type PageSlug = {
  slug: string;
  id: string;
  updatedAt?: string;
};

export interface ContentFulRepository {
  getPageData(params: GetPageParams): Promise<PageData>;

  getAllSlugs () : Promise<PageSlug[]>
}
