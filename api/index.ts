import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateImage } from "./_lib/generateImage";
import { html } from "./_lib/html";
import { Options, parseRequest } from "./_lib/parser";
import { getBskyData } from "./_lib/getBskyData";

const CACHE_MAX_AGE = 60 * 60 * 24;

export default async (
  request: VercelRequest & { query: Options },
  response: VercelResponse
) => {
  if (!request.query?.handle) {
    response.writeHead(200, {
      "Content-Type": "text/html",
    });
    return response.end(html());
  }
  try {
    const options = parseRequest(request.query);
    const personalData = await getBskyData(options.handle);
    const image = await generateImage(personalData, options);

    response.writeHead(200, {
      "Content-Type": `image/${options.type}`,
      "Content-Length": image.length,
      "Cache-Control": `public, max-age=${CACHE_MAX_AGE}, stale-while-revalidate`,
    });
    return response.end(image);
  } catch (e) {
    console.log("err");
    console.log(e);
    response.writeHead(404);
    return response.end();
  }
};
