import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

function setCorsHeaders(res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { path: pathParts = [], targetIp = "127.0.0.1", targetPort = "8001", ...queryParams } = req.query;
  
  const queryString = new URLSearchParams(
    Object.entries(queryParams).flatMap(([key, value]) =>
      Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
    ) as string[][]
  ).toString();

  const fullPath = Array.isArray(pathParts) ? pathParts.join("/") : pathParts;
  const targetUrl = `http://${targetIp}:${targetPort}/${fullPath}${queryString ? `?${queryString}` : ""}`;

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const requestBody = Buffer.concat(chunks);

  try {
    const filteredHeaders = Object.fromEntries(
      Object.entries(req.headers).filter(
        ([key, value]) =>
          typeof value === "string" &&
          !key.toLowerCase().startsWith("host") &&
          !key.toLowerCase().startsWith("content-length")
      )
    );

    const apiRes = await fetch(targetUrl, {
      method: req.method,
      headers: filteredHeaders as HeadersInit,
      body:
        req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS"
          ? undefined
          : requestBody,
      redirect: "manual"
    });

    if (apiRes.status >= 300 && apiRes.status < 400) {
      const location = apiRes.headers.get("location");
      if (location && location.match(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//)) {
        res.status(apiRes.status);
        res.setHeader("Location", location);
        apiRes.headers.forEach((value, key) => {
          if (key.toLowerCase() !== "content-encoding") res.setHeader(key, value);
        });
        return res.end();
      }
    }

    const contentType = apiRes.headers.get("content-type");
    res.status(apiRes.status);
    apiRes.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "content-encoding") res.setHeader(key, value);
    });

    if (contentType?.includes("application/json")) {
      try {
        const data = await apiRes.json();
        res.json(data);
      } catch {
        const buffer = await apiRes.arrayBuffer();
        res.send(Buffer.from(buffer));
      }
    } else {
      const buffer = await apiRes.arrayBuffer();
      res.send(Buffer.from(buffer));
    }
  } catch (err: any) {
    res.status(500).json({
      error: "Proxy failed",
      detail: err.message || "Unknown error",
      target: targetUrl
    });
  }
}
