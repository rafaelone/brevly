import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable("links", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	original_link: text("original_link").notNull(),
	short_link: text("short_link").notNull().unique(),
	access_count: integer("access_count").notNull().default(0),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
