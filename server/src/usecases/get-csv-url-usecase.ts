import { db, pg } from "@/db";
import { schema } from "@/db/schemas";

import { desc } from "drizzle-orm";
import { stringify } from "csv-stringify";

import type { StorageProvider } from "@/storage/storage";
import { PassThrough, Transform } from "node:stream";

import { pipeline } from "node:stream/promises";
import { uuidv7 } from "uuidv7";


export class GetCsvUrlUseCase {
	constructor(private storage: StorageProvider) {}

	async execute() {
		const { sql, params } = db
			.select({
				id: schema.links.id,
				original_link: schema.links.original_link,
				short_link: schema.links.short_link,
				access_count: schema.links.access_count,
				createdAt: schema.links.createdAt,
			})
			.from(schema.links)
			.orderBy(desc(schema.links.createdAt))
			.toSQL();

		const cursor = pg.unsafe(sql, params as string[]).cursor(1);

		const csv = stringify({
			delimiter: ",",
			header: true,
			columns: [
				{ key: "id", header: "ID" },
				{ key: "original_link", header: "Original URL" },
				{ key: "short_link", header: "Short URL" },
				{ key: "access_count", header: "Access Count" },
				{key: "created_at", header: "Created At"}
			],
		});

		const uploadToStorageStream = new PassThrough();

		const convertToCSVPipeline = pipeline(
			cursor,
			new Transform({
				objectMode: true,
				transform(chunks: unknown[], encoding, callback) {
					for (const chunk of chunks) {
						console.log(chunk);
						this.push(chunk);
					}
					callback();
				},
			}),
			csv,
			uploadToStorageStream,
		);

		await convertToCSVPipeline;

		const { url } = await this.storage.uploadFileAsStream({
			fileName: `${uuidv7()}.csv`,
			contentType: "text/csv",
			stream: uploadToStorageStream,
		});

		return { url };
	}
}
