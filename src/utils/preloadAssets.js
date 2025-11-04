// src/utils/preloadAssets.js
export async function preloadAssets(assets, onProgress, minDuration = 1000) {
  if (typeof window === "undefined") return; // SSR guard

  const total = assets.length || 1;
  let loaded = 0;

  const update = () => {
    loaded++;
    const percent = Math.min(Math.round((loaded / total) * 100), 100);
    onProgress?.(percent);
  };

  // --- Helper Promises ---
  const assetPromises = assets.map(({ type, src }) => {
    switch (type) {
      case "image":
      case "icon":
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          if (img.complete) {
            update();
            resolve();
          } else {
            img.onload = () => {
              update();
              resolve();
            };
            img.onerror = () => {
              update();
              resolve();
            };
          }
        });

      case "video":
        return new Promise((resolve) => {
          const video = document.createElement("video");
          video.src = src;
          video.preload = "auto";
          video.oncanplaythrough = () => {
            update();
            resolve();
          };
          video.onerror = () => {
            update();
            resolve();
          };
        });

      case "audio":
        return new Promise((resolve) => {
          const audio = new Audio();
          audio.src = src;
          audio.preload = "auto";
          audio.oncanplaythrough = () => {
            update();
            resolve();
          };
          audio.onerror = () => {
            update();
            resolve();
          };
        });

      default:
        update();
        return Promise.resolve();
    }
  });

  // --- Wait for assets + window load ---
  const assetsLoaded = Promise.all(assetPromises);
  const windowLoaded = new Promise((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", () => resolve(), { once: true });
  });

  // --- Enforce minimum 2s load duration ---
  const startTime = performance.now();
  await Promise.all([assetsLoaded, windowLoaded]);
  const elapsed = performance.now() - startTime;
  const remaining = Math.max(0, minDuration - elapsed);
  if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));

  // --- Ensure 100% progress ---
  onProgress?.(100);
}
