import { CreateLinkUseCase } from "@/usecases/create-link-usecase";
import { LinksFactories } from "@/factories/links-factories";
import { isRight, unwrapEither } from "@/shared/either";

import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createLink: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/link",
		{
			schema: {
				summary: "Create a new link",
				tags: ["links"],
				body: z.object({
					original_link: z.string(),
					short_link: z.string(),
				}),
				response: {
					200: z.object({
						message: z.string(),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { original_link, short_link } = request.body;

			const factory = LinksFactories();

			const createNewLink = new CreateLinkUseCase(factory);

			const response = await createNewLink.execute({
				original_link,
				short_link,
			});

			if (isRight(response)) {
				return reply.status(201).send({ message: "URL criado com sucesso!" });
			}

			const error = unwrapEither(response);

			switch (error.name) {
				case "BadRequest":
					return reply.status(400).send({ message: error.message });
			}
		},
	);
};
