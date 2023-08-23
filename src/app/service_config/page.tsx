import CreateButton from "@/components/CreateButton";
import PageCard from "@/components/PageCard";
import { ServiceConfig } from "@/types/db";
import mysql from "@/lib/mysql";

export default async function ServiceConfig({
  searchParams,
}: {
  searchParams: {
    id?: string;
  };
}) {
  const id = searchParams?.id;
  const data = (await mysql.query(
    id
      ? `SELECT * FROM \`service_config\` WHERE \`id\` = (
        SELECT service_id FROM \`page_section_service_mapping\` WHERE \`page_section_id\`= ?
      )`
      : "SELECT * FROM `service_config`",
    [id]
  )) as ServiceConfig[];

  if (data.length === 0) {
    return (
      <div>
        <span className="text-red-500 text-xl">
          No service config found {id && `with ID ${id}`}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <span className="text-2xl mb-2">Service Config</span>

      <div className="justify-center flex flex-wrap">
        {data.map((service) => (
          <PageCard
            key={service.id}
            pid={service.id}
            name={service.name}
            editHref="/service_config/edit"
          />
        ))}
        <CreateButton href="/service_config/create" className="mt-2 w-20" />
      </div>
    </div>
  );
}
