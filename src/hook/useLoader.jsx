"use client";
import { resources } from "@/config/FileSource";
import { useEffect, useState } from "react";

const loadedAssets = new Set();

export default function useAssetLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!resources || resources.length === 0) {
      setProgress(100);
      setIsLoaded(true);
      return;
    }

    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      const pct = Math.round((loadedCount / resources.length) * 100);
      setProgress(pct);
      if (pct === 100) setIsLoaded(true);
    };

    const promises = resources.map((url) => {
      if (loadedAssets.has(url)) {
        // Already loaded, skip
        updateProgress();
        return Promise.resolve();
      }

      const ext = url.split(".").pop().toLowerCase();

      if (["jpg", "png", "webp", "jpeg", "gif", "avif"].includes(ext)) {
        return new Promise((res, rej) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            loadedAssets.add(url);
            updateProgress();
            res();
          };
          img.onerror = rej;
        });
      }

      if (["mp4", "webm"].includes(ext)) {
        return new Promise((res, rej) => {
          const v = document.createElement("video");
          v.src = url;
          v.preload = "auto";
          v.oncanplaythrough = () => {
            loadedAssets.add(url);
            updateProgress();
            res();
          };
          v.onerror = rej;
        });
      }

      if (["woff2", "woff", "ttf", "otf"].includes(ext)) {
        return new Promise((res, rej) => {
          const font = new FontFace("PreloadFont", `url(${url})`);
          font.load()
            .then(() => {
              document.fonts.add(font);
              loadedAssets.add(url);
              updateProgress();
              res();
            })
            .catch(rej);
        });
      }
      updateProgress();
      return Promise.resolve();
    });

    Promise.allSettled(promises);
  }, [resources]);

  return { progress, isLoaded };
}
