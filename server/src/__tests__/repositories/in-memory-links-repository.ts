import type { ILinksRepository, Link } from "@/repositories/links-repository";
import { uuidv7 } from "uuidv7";
import { makeLinks } from "../factories/make-links";

export class InMemoryLinksRepository implements ILinksRepository {
	public items: Link[] = [];

	async create(
		original_link: string,
		short_link: string,
	): Promise<{ id: string }> {
		const link = await makeLinks({
			original_link,
			short_link,
		});
		this.items.push(link);
		return { id: link.id };
	}

	async fetch(): Promise<Link[]> {
		return this.items;
	}

	async getByShortLink(short_link: string): Promise<Link | null> {
		const link = this.items.find((link) => link.short_link === short_link);

		if (!link) {
			return null;
		}

		return link;
	}

	async getById(id: string): Promise<Link | null> {
		const link = this.items.find((link) => link.id === id);

		if (!link) {
			return null;
		}

		return link;
	}

	async update(id: string, access_count: number): Promise<void> {
		const findIndex = this.items.findIndex((item) => item.id === id);

		this.items[findIndex].access_count = access_count + 1;
	}
	async delete(id: string): Promise<void> {
		const findIndex = this.items.findIndex((item) => item.id === id);

		this.items.slice(findIndex, 1);
	}
}
