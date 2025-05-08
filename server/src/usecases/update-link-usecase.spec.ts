import { InMemoryLinksRepository } from '@/__tests__/repositories/in-memory-links-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { isLeft, isRight, unwrapEither } from '@/shared/either';

import { GetByShortLinkLinkUseCase } from './get-by-short-link-usecase';
import  { UpdateLinkUseCase } from './update-link-usecase';

let inMemoryLinksRepository: InMemoryLinksRepository;
let sut: UpdateLinkUseCase;

describe('Update a link', () => {
  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository();
    sut = new UpdateLinkUseCase(inMemoryLinksRepository);
  });

  it('should be to update a link', async () => {
    const link = await inMemoryLinksRepository.create('https://google.com', 'google');

    const result = await sut.execute({id: link.id });

    expect(isRight(result)).toBe(true);
  });

  it('should not be able update a link if not exists ', async () => {
    const result = await sut.execute({ id: '123' });
    expect(isLeft(result)).toBe(true);
  });
});
