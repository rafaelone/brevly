import { DeleteLinkUseCase } from '@/usecases/delete-link-usecase';
import { LinksFactories } from '@/factories/links-factories';
import { isRight, unwrapEither } from '@/shared/either';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const deleteLink: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    '/link',
    {
      schema: {
        summary: 'Delete a link',
        tags: ['links'],
        querystring: z.object({
          id: z.string(),
        }),
        response: {
          204: z.null(),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.query;

      const factory = LinksFactories();
      const deleteLink = new DeleteLinkUseCase(factory);
      const response = await deleteLink.execute({ id });

      if (isRight(response)) {
        return reply.status(204).send();
      }

      const error = unwrapEither(response);

      switch (error.name) {
        case 'BadRequest':
          return reply.status(400).send({ message: error.message });
      }
    },
  );
};
