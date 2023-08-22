export default async function PageConfigServices({
  searchParams,
}: {
  searchParams: { name: string };
}) {
  const name = searchParams.name;
  return <div>{name}</div>;
}
