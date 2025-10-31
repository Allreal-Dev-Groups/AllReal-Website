import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  bannerImages: es.fileBucket({
    maxSize: 1024 * 1024 * 10, // 10MB
    accept: ["image/jpeg", "image/png"],
  }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST, edgeStoreRouter };
