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

  const { path: pathParts = [] } = req.query;
  const queryParams = { ...req.query };
  delete queryParams.path;

  const queryString = new URLSearchParams(
    Object.entries(queryParams).flatMap(([key, value]) =>
      Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
    ) as string[][]
  ).toString();

  const fullPath = Array.isArray(pathParts) ? pathParts.join("/") : pathParts;

  // const targetUrl = `https://facilitate-dui-investigate-aye.trycloudflare.com/api/v1/${fullPath}${
  //   queryString ? `?${queryString}` : ""
  // }`;
  const targetUrl = `http://35.198.229.102:8001/${fullPath}${
    queryString ? `?${queryString}` : ""
  }`;
  // Thu thập request body
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
          !key.toLowerCase().startsWith("host") && // Loại bỏ host header
          !key.toLowerCase().startsWith("content-length") // Let fetch handle this
      )
    );

    const apiRes = await fetch(targetUrl, {
      method: req.method,
      headers: filteredHeaders as HeadersInit,
      body:
        req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS"
          ? undefined
          : requestBody,
      redirect: 'manual' // ⭐ Quan trọng: không tự động redirect
    });

    console.log(`[Proxy] Status: ${apiRes.status}`);
    
    // Xử lý redirect responses (3xx)
    if (apiRes.status >= 300 && apiRes.status < 400) {
      const location = apiRes.headers.get('location');
      console.log(`[Proxy] Redirect location: ${location}`);
      
      if (location) {
        // Kiểm tra nếu là custom scheme (hms3do://, myapp://, etc.)
        if (location.match(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//)) {
          // Trả về redirect response cho client xử lý
          res.status(apiRes.status);
          res.setHeader('Location', location);
          
          // Copy tất cả headers từ response
          apiRes.headers.forEach((value, key) => {
            if (key.toLowerCase() !== 'content-encoding') {
              res.setHeader(key, value);
            }
          });
          
          return res.end();
        }
      }
    }

    const contentType = apiRes.headers.get("content-type");
    
    // Set status và headers
    res.status(apiRes.status);
    
    // Copy response headers
    apiRes.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-encoding') {
        res.setHeader(key, value);
      }
    });

    if (contentType?.includes("application/json")) {
      try {
        const data = await apiRes.json();
        res.json(data);
      } catch (jsonErr) {
        // Nếu không parse được JSON, trả về như binary
        const buffer = await apiRes.arrayBuffer();
        res.send(Buffer.from(buffer));
      }
    } else {
      const buffer = await apiRes.arrayBuffer();
      res.send(Buffer.from(buffer));
    }
  } catch (err: any) {
    console.error("[Proxy Error]", err);
    
    res.status(500).json({
      error: "Proxy failed",
      detail: err.message || "Unknown error",
      target: targetUrl
    });
  }
}