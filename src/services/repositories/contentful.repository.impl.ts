import {
  ContentFulRepository, GetPageParams, IPageFields, PageData, PageSlug
} from './contentful.repository';
import {
  createClient,
  Entry
} from 'contentful';
import getConfig from 'next/config';
import { injectable } from 'inversify';

const { publicRuntimeConfig } = getConfig();

const client = createClient({
  accessToken: publicRuntimeConfig.CF_DELIVERY_ACCESS_TOKEN,
  environment: publicRuntimeConfig.CF_ENVIRONMENT,
  space: publicRuntimeConfig.CF_SPACE_ID
});

@injectable()
export class ContentFulRepositoryIml implements ContentFulRepository {
  async getPage(params: GetPageParams): Promise<Entry<unknown>> {
    const query = {
      content_type: 'pagina',
      'fields.slug': params.pageSlug,
      include: 10,
      limit: 1,
      locale: params.locale
    };

    const { items: [page] } = await client.getEntries(query);

    return page || null;
  }

  async getPageData(params: GetPageParams): Promise<PageData> {
    const page = await this.getPage(params);
    const fields = page?.fields as PageData;

    fields.pageId = page.sys.id;

    return fields;
  }

  async getAllSlugs() : Promise<PageSlug[]> {
    const query = {
      content_type: 'pagina',
      include: 1,
      limit: 100,
      locale: '*'
    };

    const {
      items, total
    } = await client.getEntries<IPageFields>(query);

    // console.log(items, 'items')
    return items.map(item => (
      {
        id: item.sys.id,
        slug: item.fields.slug,
        updatedAt: item.sys.updatedAt
      }
    ));
  }
}
