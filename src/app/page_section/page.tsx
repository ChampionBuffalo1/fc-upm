import mysql from "@/lib/mysql";
import { PageSection } from "@/types/db";

export default async function PageConfigServices({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const id = searchParams.id;

  if (id) {
    const data = (await mysql.query(
      "SELECT * FROM `page_section` WHERE `page_config_id` = ?",
      [id]
    )) as PageSection[];
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }

  const data = await mysql.query("SELECT * FROM `page_section`");
  return (
    <div>
      {id}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
