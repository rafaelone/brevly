export type Link = {
	id: string;
	original_link: string;
	short_link: string;
	access_count: number;
};

export interface ILinksRepository {
	create: (
		original_link: string,
		short_link: string,
	) => Promise<{ id: string }>;
	fetch: () => Promise<Link[]>;
	getByShortLink: (short_link: string) => Promise<Link | null>;
	getById: (id: string) => Promise<Link | null>;
	update: (id: string, access_count: number) => Promise<void>;
	delete: (id: string) => Promise<void>;
}
