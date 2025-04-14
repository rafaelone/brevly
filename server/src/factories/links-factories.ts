import { LinksRepository } from "@/db/repositories/links-repository";

export function LinksFactories() {
	const linkRepository = new LinksRepository();
	return linkRepository;
}
