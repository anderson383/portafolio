import 'reflect-metadata';
import { Container } from 'inversify';
import { ContentFulRepository } from './repositories/contentful.repository';
import { ContentFulRepositoryIml } from './repositories/contentful.repository.impl';

import { TYPES } from './types';

const repositoryContainer = new Container();

repositoryContainer.bind<ContentFulRepository>(TYPES.CONTENTFUL_REPOSITORY).to(ContentFulRepositoryIml);

export {repositoryContainer};
