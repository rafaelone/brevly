import type { LinksRepository } from "@/db/repositories/links-repository";
import { BadRequest } from "@/errors/bad-request";
import { makeLeft, makeRight, type Either } from "@/shared/either";
import { z } from "zod";

const deleteLinkUseCaseInput = z.object({
	id: z.string(),
});

type DeleteLinkUseCaseParams = z.input<typeof deleteLinkUseCaseInput>;

type DeleteLinkUseCaseResponse = {
	deleted: boolean;
};

export class DeleteLinkUseCase {
	constructor(private links: LinksRepository) {}

	async execute(
		input: DeleteLinkUseCaseParams,
	): Promise<Either<BadRequest, DeleteLinkUseCaseResponse>> {
		const { id } = deleteLinkUseCaseInput.parse(input);

		const link = await this.links.getById(id);

		if (!link) {
			return makeLeft(new BadRequest("Não foi possível apagar essa URL."));
		}

		await this.links.delete(id);

		return makeRight({ deleted: true });
	}
}
