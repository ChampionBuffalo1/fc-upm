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
    "SELECT * FROM `service_config` WHERE id = ?",
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
