import type { LinksRepository } from "@/db/repositories/links-repository";
import { BadRequest } from "@/errors/bad-request";
import { makeLeft, makeRight, type Either } from "@/shared/either";
import { z } from "zod";

const createLinkUseCaseInput = z.object({
	original_link: z.string(),
	short_link: z.string(),
});

type CreateLinkUseCaseInput = z.input<typeof createLinkUseCaseInput>;

type CreateLinkUseCaseResponse = {
	id: string;
};

export class CreateLinkUseCase {
	constructor(private links: LinksRepository) {}

	async execute(
		input: CreateLinkUseCaseInput,
	): Promise<Either<BadRequest, CreateLinkUseCaseResponse>> {
		const { original_link, short_link } = createLinkUseCaseInput.parse(input);

		const regexToShortLink = /^(?!.*(https:\/\/|\.com|\.br)).+$/;
		const regexToOriginalLink = /(https?:\/\/|\.com|\.br)/;

		if (!regexToOriginalLink.test(original_link)) {
			return makeLeft(new BadRequest("URL original inválida."));
		}

		if (!regexToShortLink.test(short_link)) {
			return makeLeft(new BadRequest("URL encurtada está mal formatada."));
		}

		const link = await this.links.getByShortLink(short_link);

		if (link) {
			return makeLeft(new BadRequest("Essa URL encurtada já existe"));
		}

		const response = await this.links.create(original_link, short_link);

		return makeRight({ id: response.id });
	}
}
