import mysql from "@/lib/mysql";
import PageCard from "@/components/PageCard";
import { PageSection } from "@/types/db";
import CreateButton from "@/components/CreateButton";

const query =
  "SELECT ps.id, priority, active, name FROM `page_section` ps LEFT JOIN `page_config` pc ON pc.id = ps.page_config_id";

export default async function PageConfigServices({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const id = searchParams.id;
  const data = (await mysql.query(
    id ? `${query} WHERE \`page_config_id\` = ?` : query,
    [id]
  )) as (PageSection & { name: string })[];

  if (data.length === 0)
    return (
      <span className="text-red-500 text-xl">
        No sections found {id && `with ID ${id}`}
      </span>
    );

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <span className="text-xl mb-2">
        {id ? data[0]?.name : "All"} Sections
      </span>
      <div className="justify-center flex flex-wrap">
        {data.map((obj, key) => (
          <PageCard
            key={key}
            pid={obj.id}
            name={id ? `Section ${obj.id}` : `${obj.name} Section ${obj.id}`}
            clickHref="/service_config"
            editHref="/page_section/edit"
          />
        ))}
        <CreateButton href="/page_section/create" className="mt-2" />
      </div>
    </div>
  );
}
