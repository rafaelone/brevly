import { InMemoryLinksRepository } from '@/__tests__/repositories/in-memory-links-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { isLeft, isRight, unwrapEither } from '@/shared/either';
import { BadRequest } from '@/errors/bad-request';
import { DeleteLinkUseCase } from './delete-link-usecase';

let inMemoryLinksRepository: InMemoryLinksRepository;
let sut: DeleteLinkUseCase;

describe('Delete link', () => {
  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository();
    sut = new DeleteLinkUseCase(inMemoryLinksRepository);
  });

  it('should be able to delete a link', async () => {
    const link = await inMemoryLinksRepository.create(
      'https://google.com',
      'google',
    );

    const result = await sut.execute({ id: link.id });

    expect(isRight(result)).toBe(true);
  });

  it('should not be able delete a link if not exists', async () => {
    const result = await sut.execute({ id: '123' });

    expect(isLeft(result)).toBe(true);
    expect(unwrapEither(result)).toBeInstanceOf(BadRequest);
  });
});
