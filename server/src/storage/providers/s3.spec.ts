import { describe, it, expect, vi, beforeEach } from "vitest";
import { Readable } from "node:stream";
import { Upload } from "@aws-sdk/lib-storage";
import { S3StorageProvier } from "./s3";
import type { CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";

vi.mock("@/env", () => ({
  env: {
    AWS_REGION: "us-east-1",
    AWS_ACCESS_KEY_ID: "fake-id",
    AWS_SECRET_ACCESS_KEY: "fake-secret",
    AWS_BUCKET: "fake-bucket",
    AWS_CDN: "https://cdn.example.com/",
  },
}));

describe("S3StorageProvier", () => {
  let doneSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    doneSpy = vi
  .spyOn(Upload.prototype, "done")
  .mockResolvedValue({ $metadata: {} } as CompleteMultipartUploadCommandOutput);
  });

  it("deve enviar o arquivo e retornar a URL correta", async () => {
    const provider = new S3StorageProvier();
    const stream = Readable.from(["conteúdo"]);

    const result = await provider.uploadFileAsStream({
      fileName: "teste arquivo.csv",
      contentType: "text/csv",
      stream,
    });

    expect(doneSpy).toHaveBeenCalled();
    expect(result.url).toBe("https://cdn.example.com/testearquivo.csv");
  });
});
