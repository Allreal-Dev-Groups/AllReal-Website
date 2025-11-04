import { useLoader } from "@/store/loaderStore";

const startLoading = () => useLoader.getState().startLoading();
const stopLoading = () => useLoader.getState().stopLoading();

export async function fetchClient(url, options = {}) {
  try {
    startLoading();
    const res = await fetch(url, options);
    return res; // ✅ Return the full Response object
  } catch (err) {
    console.error("Global Fetch Error:", err);
    throw err;
  } finally {
    stopLoading();
  }
}
