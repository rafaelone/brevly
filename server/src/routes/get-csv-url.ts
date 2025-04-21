import { GetCsvUrlUseCase } from "@/usecases/get-csv-url-usecase";
import { S3StorageProvier } from "@/storage/providers/s3";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getCSVUrl: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/links/csv",
		{
			schema: {
				summary: "Get a CSV Url",
				tags: ["links"],

				response: {
					201: z.object({ url: z.string() }),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			// const result = await getCsvUrlUseCase();

			const storageProvider = new S3StorageProvier();
			const response = new GetCsvUrlUseCase(storageProvider);

			const { url } = await response.execute();

			await reply.status(201).send({ url });

			// if (isRight(result)) {
			// 	return reply.status(200).send({ url: result.right.url });
			// }

			// const error = unwrapEither(result);

			// switch (error.name) {
			// 	case "BadRequest":
			// 		return reply.status(400).send({ message: error.message });
			// }
		},
	);
};
