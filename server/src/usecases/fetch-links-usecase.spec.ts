import { InMemoryLinksRepository } from '@/__tests__/repositories/in-memory-links-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { isRight, unwrapEither } from '@/shared/either';

import { FetchLinksUseCase } from './fetch-links-usecase';

let inMemoryLinksRepository: InMemoryLinksRepository;
let sut: FetchLinksUseCase;

describe('Fetch link', () => {
  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository();
    sut = new FetchLinksUseCase(inMemoryLinksRepository);
  });

  it('should be to fetch all links', async () => {
    await inMemoryLinksRepository.create('https://google.com', 'google');
    await inMemoryLinksRepository.create(
      'https://rocketseat.com',
      'rocketseat',
    );

    const result = await sut.execute();

    expect(isRight(result)).toBe(true);
    expect(unwrapEither(result).links).toHaveLength(2);
  });
});
