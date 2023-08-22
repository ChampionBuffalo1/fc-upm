import EditForm from "./form";
import mysql from "@/lib/mysql";
import { PageConfig } from "@/types/db";

export default async function EditPage({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) {
  const data = (await mysql.query(
    "SELECT id, name, created_at, updated_at FROM page_config WHERE id = ?",
    [searchParams.id]
  )) as [PageConfig] | [];
  return (
    <div className="flex flex-col justify-center items-center h-full">
      {data.length === 0 && (
        <span className="">No config found for id {searchParams.id}</span>
      )}
      {data.length === 1 && <EditForm {...data[0]} />}
    </div>
  );
}
