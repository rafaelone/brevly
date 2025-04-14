import type { LinksRepository } from "@/db/repositories/links-repository";
import { BadRequest } from "@/errors/bad-request";
import { makeLeft, makeRight, type Either } from "@/shared/either";
import { z } from "zod";

const updateLinkUseCaseInput = z.object({
	id: z.string(),
});

type UpdateLinkUseCaseInput = z.input<typeof updateLinkUseCaseInput>;

type UpdateLinkUseCaseResponse = {
	id: string;
};

export class UpdateLinkUseCase {
	constructor(private links: LinksRepository) {}

	async execute(
		input: UpdateLinkUseCaseInput,
	): Promise<Either<BadRequest, UpdateLinkUseCaseResponse>> {
		const { id } = updateLinkUseCaseInput.parse(input);

		const link = await this.links.getById(id);

		if (!link) {
			return makeLeft(new BadRequest("URL não encontrada"));
		}

		await this.links.update(id, link.access_count);

		return makeRight({ id: link.id });
	}
}
