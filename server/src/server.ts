import { env } from "@/env";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { transformSwaggerSchema } from "./transform-swagger-schema";
import { createLink } from "./routes/create-link";
import { deleteLink } from "./routes/delete-link";
import { getByShortLink } from "./routes/get-by-short-link";
import { fetchLinks } from "./routes/fetch-links";
import { updateLink } from "./routes/update-link";
import { getCSVUrl } from "./routes/get-csv-url";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, _, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: "Validation error",
			issues: error.validation,
		});
	}

	return reply.status(500).send({ message: "Internal server error." });
});

server.register(fastifyCors, {
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE"],
});
server.register(fastifyMultipart);
server.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Brev.ly",
			version: "1.0.0",
		},
	},
	transform: transformSwaggerSchema,
});

// server.register(route)
server.register(createLink);
server.register(deleteLink);
server.register(getByShortLink);
server.register(fetchLinks);
server.register(updateLink);
server.register(getCSVUrl);

server.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

server.listen({ port: env.PORT ?? 3333, host: "0.0.0.0" }).then(() => {
	console.log(`Server Running on port ${env.PORT}`);
});
