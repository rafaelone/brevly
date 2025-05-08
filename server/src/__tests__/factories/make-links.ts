import type { Link } from "@/repositories/links-repository";
import { faker } from "@faker-js/faker";
import { uuidv7 } from "uuidv7";

export async function makeLinks(override: Partial<Link> = {}) {
	const link = {
		original_link: faker.internet.url(),
		short_link: faker.internet.domainWord(),
		id: uuidv7(),
		access_count: 0,
		...override,
	};

	return link;
}
