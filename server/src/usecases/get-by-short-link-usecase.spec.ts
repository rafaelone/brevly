import { InMemoryLinksRepository } from '@/__tests__/repositories/in-memory-links-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { isLeft, isRight, unwrapEither } from '@/shared/either';

import { GetByShortLinkLinkUseCase } from './get-by-short-link-usecase';

let inMemoryLinksRepository: InMemoryLinksRepository;
let sut: GetByShortLinkLinkUseCase;

describe('Get by short link', () => {
  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository();
    sut = new GetByShortLinkLinkUseCase(inMemoryLinksRepository);
  });

  it('should be to get link by short link', async () => {
    await inMemoryLinksRepository.create('https://google.com', 'google');

    const result = await sut.execute({ short_link: 'google' });

    expect(isRight(result)).toBe(true);
  });

  it('should not be able to get link if not exists ', async () => {


    const result = await sut.execute({ short_link: 'google' });

    expect(isLeft(result)).toBe(true);
  });
});
