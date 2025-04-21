import { UpdateLinkUseCase } from "@/usecases/update-link-usecase";
import { LinksFactories } from "@/factories/links-factories";
import { isRight, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const updateLink: FastifyPluginAsyncZod = async (server) => {
	server.put(
		"/link",
		{
			schema: {
				summary: "Update a link",
				tags: ["links"],
				querystring: z.object({
					id: z.string(),
				}),
				response: {
					200: z.object({
						message: z.null(),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.query;

			const factory = LinksFactories();

			const updateNewLink = new UpdateLinkUseCase(factory);

			const response = await updateNewLink.execute({
				id,
			});

			if (isRight(response)) {
				return reply.status(204).send();
			}

			const error = unwrapEither(response);

			switch (error.name) {
				case "BadRequest":
					return reply.status(400).send({ message: error.message });
			}
		},
	);
};
