import { S3Client } from "@aws-sdk/client-s3";
import type { StorageProvider, UploadFileAsStreamInput } from "../storage";
import { env } from "@/env";
import { basename, extname } from "node:path";
import { Upload } from "@aws-sdk/lib-storage";

export class S3StorageProvier implements StorageProvider {
	private client: S3Client;

	constructor() {
		this.client = new S3Client({
			region: env.AWS_REGION,
			credentials: {
				accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
				secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
			},
			requestChecksumCalculation: "WHEN_REQUIRED",
			responseChecksumValidation: "WHEN_REQUIRED",
		});
	}

	private sanitizeFileName(fileName: string) {
		const ext = extname(fileName);
		const baseName = basename(fileName, ext);
		const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, "");

		return sanitizedBaseName.concat(ext);
	}

	public async uploadFileAsStream({
		fileName,
		contentType,
		stream,
	}: UploadFileAsStreamInput) {
		const key = this.sanitizeFileName(fileName);

		const upload = new Upload({
			client: this.client,
			params: {
				Key: key,
				Bucket: env.CLOUDFLARE_BUCKET,
				Body: stream,
				ContentType: contentType,
			},
		});

		await upload.done();

		return {
			url: new URL(key, env.CLOUDFLARE_PUBLIC_URL).toString(),
		};
	}
}
