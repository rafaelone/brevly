import type { LinksRepository } from "@/db/repositories/links-repository";
import { makeRight, type Either } from "@/shared/either";

type FetchLinksUseCaseResponse = {
	links: {
		id: string;
		original_link: string;
		short_link: string;
		access_count: number;
	}[];
};

export class FetchLinksUseCase {
	constructor(private links: LinksRepository) {}

	async execute(): Promise<Either<never, FetchLinksUseCaseResponse>> {
		const links = await this.links.fetch();

		return makeRight({ links });
	}
}
