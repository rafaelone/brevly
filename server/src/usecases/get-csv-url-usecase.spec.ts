import { describe, it, expect, vi, beforeEach } from "vitest";
import { Readable } from "node:stream";

import { db, pg } from "@/db"; // necessário para o spyOn funcionar
import { GetCsvUrlUseCase } from "./get-csv-url-usecase";


describe("GetCsvUrlUseCase", () => {
  vi.mock("@/env", () => ({
    env: {
      AWS_REGION: "us-east-1",
      CLOUDFLARE_ACCESS_KEY_ID: "fake-id",
      CLOUDFLARE_SECRET_ACCESS_KEY: "fake-secret",
      CLOUDFLARE_BUCKET: "fake-bucket",
      CLOUDFLARE_PUBLIC_URL: "https://cdn.example.com/",
    },
  }));

  const storageMock = {
    uploadFileAsStream: vi.fn().mockResolvedValue({
      url: "https://example.cloudfront.net/fake.csv",
    }),
  };

  const fakeCursor = Readable.from([
    [{ id: "1", original_link: "https://site.com", short_link: "site", access_count: 2, created_at: new Date() }],
  ]);

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock encadeado do db
    vi.spyOn(db, "select").mockReturnValue({
      from: vi.fn().mockReturnValue({
        orderBy: vi.fn().mockReturnValue({
          toSQL: vi.fn().mockReturnValue({
            sql: "SELECT * FROM links",
            params: [],
          }),
        }),
      }),
    } as any);

    // Mock do pg.unsafe().cursor()
    vi.spyOn(pg, "unsafe").mockReturnValue({
      cursor: vi.fn().mockReturnValue(fakeCursor),
    } as any);
  });

  it("should be able to return a url after generate csv and send to storage", async () => {
    const useCase = new GetCsvUrlUseCase(storageMock as any);

    const result = await useCase.execute();

    expect(result.url).toBe("https://example.cloudfront.net/fake.csv");
    expect(storageMock.uploadFileAsStream).toHaveBeenCalledOnce();
    expect(pg.unsafe).toHaveBeenCalledOnce();
  });
});
