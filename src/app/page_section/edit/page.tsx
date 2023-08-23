import EditForm from "./form";
import mysql from "@/lib/mysql";
import { PageSection } from "@/types/db";

export default async function EditPage({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) {
  const data = (await mysql.query(
    "SELECT id, active, priority, page_config_id, created_at, updated_at FROM `page_section` WHERE id = ?",
    [searchParams.id]
  )) as [PageSection] | [];
  return (
    <div className="flex flex-col justify-center items-center h-full">
      {data.length === 0 && (
        <span className="text-xl">
          No section found with id {searchParams.id}
        </span>
      )}
      {data.length === 1 && <EditForm {...data[0]} />}
    </div>
  );
}
