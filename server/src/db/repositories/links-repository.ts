import type { ILinksRepository, Link } from "@/repositories/links-repository";
import { db } from "..";
import { schema } from "../schemas";
import { ilike, desc, eq } from "drizzle-orm";

export class LinksRepository implements ILinksRepository {
	async create(
		original_link: string,
		short_link: string,
	): Promise<{ id: string }> {
		const [user] = await db
			.insert(schema.links)
			.values({
				original_link,
				short_link,
			})
			.returning({ id: schema.links.id });

		return { id: user.id };
	}

	async getByShortLink(short_link: string): Promise<Link | null> {
		const [link] = await db
			.select({
				id: schema.links.id,
				original_link: schema.links.original_link,
				short_link: schema.links.short_link,
				access_count: schema.links.access_count,
			})
			.from(schema.links)
			.where(
				short_link
					? ilike(schema.links.short_link, `%${short_link}%`)
					: undefined,
			);

		if (link) return link;

		return null;
	}

	async getById(id: string): Promise<Link | null> {
		const [link] = await db
			.select({
				id: schema.links.id,
				original_link: schema.links.original_link,
				short_link: schema.links.short_link,
				access_count: schema.links.access_count,
			})
			.from(schema.links)
			.where(id ? eq(schema.links.id, id) : undefined);

		if (link) return link;

		return null;
	}

	async fetch(): Promise<Link[]> {
		const links = await db
			.select({
				id: schema.links.id,
				original_link: schema.links.original_link,
				short_link: schema.links.short_link,
				access_count: schema.links.access_count,
			})
			.from(schema.links)
			.orderBy(desc(schema.links.createdAt));

		return links;
	}

	async update(id: string, access_count: number): Promise<void> {
		await db
			.update(schema.links)
			.set({ access_count: access_count + 1 })
			.where(eq(schema.links.id, id));
	}

	async delete(id: string): Promise<void> {
		await db.delete(schema.links).where(eq(schema.links.id, id));
	}
}
