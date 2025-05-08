import { FetchLinksUseCase } from "@/usecases/fetch-links-usecase";
import { LinksFactories } from "@/factories/links-factories";
import { unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { env } from "@/env";

export const fetchLinks: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/links",
		{
			schema: {
				summary: "Get links",
				tags: ["links"],
				response: {
					200: z.object({
						links: z.array(
							z.object({
								id: z.string(),
								original_link: z.string(),
								short_link: z.string(),
								access_count: z.number(),
							}),
						),
					}),
				},
			},
		},
		async (_, reply) => {
			const factory = LinksFactories();

			const fetchLinks = new FetchLinksUseCase(factory);

			const response = await fetchLinks.execute();

			const { links } = unwrapEither(response);

			return reply.status(200).send({ links });
		},
	);
};
