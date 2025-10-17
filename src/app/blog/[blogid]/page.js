
export default async function Home({params}) {
  const { blogid } = await params;
  console.log(blogid)
  return (
    <>
      <h1>sssss</h1>
    </>
  );
}
