


export async function fetchClient(url, options = {}) {
  try {

    const res = await fetch(`${process.env.URL}${url}`, options);
    return res; // ✅ Return the full Response object
  } catch (err) {
    console.error("Global Fetch Error:", err);
    throw err;
  }
}
export async function fetchDelete({_id}) {
  try {
    const res = await fetch(`/api/blogs/${_id}`, { method: "DELETE" });
    if(res.ok) alert("Removed..")
    return res; // ✅ Return the full Response object

  } catch (err) {
    console.error("Global Fetch Error:", err);
    throw err;
  }
}
export async function fetchPost({payload}) {
  try {

    const res = await fetch(`/api/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res; // ✅ Return the full Response object
  } catch (err) {
    console.error("Global Fetch Error:", err);
    throw err;
  } 
  
}
