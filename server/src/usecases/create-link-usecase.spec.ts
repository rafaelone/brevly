import { InMemoryLinksRepository } from '@/__tests__/repositories/in-memory-links-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateLinkUseCase } from './create-link-usecase';
import { isLeft, isRight, unwrapEither } from '@/shared/either';
import { BadRequest } from '@/errors/bad-request';


let inMemoryLinksRepository: InMemoryLinksRepository;
let sut: CreateLinkUseCase;

describe('Create link', () => {
  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository();
    sut = new CreateLinkUseCase(inMemoryLinksRepository);
  });

  it('should not be able to create a link if original link is invalid', async () => {
    const result = await sut.execute({
      original_link: 'google',
      short_link: 'google',
    });

    expect(isLeft(result)).toBe(true);
    expect(unwrapEither(result)).toBeInstanceOf(BadRequest);
  });

  it('should not be able to create a link if short link is invalid', async () => {
    const result = await sut.execute({
      original_link: 'https://google.com',
      short_link: 'google.com',
    });

    expect(isLeft(result)).toBe(true);
    expect(unwrapEither(result)).toBeInstanceOf(BadRequest);
  });

  it('should not be able to create a link if short link already exists', async () => {
    await sut.execute({
      original_link: 'https://google.com',
      short_link: 'google',
    });

    const result = await sut.execute({
      original_link: 'https://google.com',
      short_link: 'google',
    });

    expect(isLeft(result)).toBe(true);
    expect(unwrapEither(result)).toBeInstanceOf(BadRequest);
  });

  it('should be able to create a new link', async () => {
    const result = await sut.execute({
      original_link: 'https://google.com',
      short_link: 'google',
    });

    expect(isRight(result)).toBe(true);
  });
});
