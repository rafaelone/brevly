import { makeLeft, makeRight, type Either } from "@/shared/either";
import { z } from "zod";
import type { Link } from "@/repositories/links-repository";
import type { LinksRepository } from "@/db/repositories/links-repository";
import { BadRequest } from "@/errors/bad-request";

const getByShortLinkUseCaseInput = z.object({
	short_link: z.string(),
});

type GetByShortLinkUseCaseInput = z.input<typeof getByShortLinkUseCaseInput>;

type GetByShortLinkUseCaseResponse = {
	link: Link;
};

export class GetByShortLinkLinkUseCase {
	constructor(private links: LinksRepository) {}

	async execute(
		input: GetByShortLinkUseCaseInput,
	): Promise<Either<BadRequest, GetByShortLinkUseCaseResponse>> {
		const { short_link } = getByShortLinkUseCaseInput.parse(input);

		const link = await this.links.getByShortLink(short_link);

		if (!link) {
			return makeLeft(new BadRequest("Essa URL encurtada já existe"));
		}

		return makeRight({ link });
	}
}
