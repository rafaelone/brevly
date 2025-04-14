import { GetByShortLinkLinkUseCase } from "@/app/usecases/get-by-short-link-usecase";
import { LinksFactories } from "@/factories/links-factories";
import { isRight, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getByShortLink: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/link",
		{
			schema: {
				summary: "Get by short link",
				tags: ["links"],
				querystring: z.object({
					short_link: z.string(),
				}),
				response: {
					200: z.object({
						link: z.object({
							id: z.string(),
							original_link: z.string(),
							short_link: z.string(),
							access_count: z.number(),
						}),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { short_link } = request.query;

			const factory = LinksFactories();

			const createNewLink = new GetByShortLinkLinkUseCase(factory);

			const response = await createNewLink.execute({
				short_link,
			});

			if (isRight(response)) {
				return reply.status(201).send({ link: response.right.link });
			}

			const error = unwrapEither(response);

			switch (error.name) {
				case "BadRequest":
					return reply.status(400).send({ message: error.message });
			}
		},
	);
};
