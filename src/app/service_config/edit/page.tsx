import EditForm from "./form";
import mysql from "@/lib/mysql";
import { ServiceConfig } from "@/types/db";

export default async function EditPage({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) {
  const data = (await mysql.query(
    "SELECT sc.*, page_section_id FROM `service_config` sc LEFT JOIN page_section_service_mapping psm ON sc.id = psm.service_id WHERE sc.id = ?",
    [searchParams.id]
  )) as [ServiceConfig] | [];
  return (
    <div className="flex flex-col justify-center items-center h-full">
      {data.length === 0 && (
        <span className="text-xl">
          No config found for id {searchParams.id}
        </span>
      )}
      {data.length === 1 && <EditForm {...data[0]} />}
    </div>
  );
}
