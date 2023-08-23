import mysql from "@/lib/mysql";
import PageCard from "@/components/PageCard";
import { PageConfig } from "@/types/db";
import CreateButton from "@/components/CreateButton";

export default async function Home() {
  const data = (await mysql.query(
    "SELECT id, name FROM `page_config`"
  )) as PageConfig[];

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <span className="text-xl m-4">Page Config Services</span>
      <div className="flex flex-wrap justify-center">
        {data.length !== 0 &&
          data.map((config) => (
            <PageCard
              key={config.id}
              pid={config.id}
              name={config.name}
              clickHref="/page_section"
              editHref="/page_config/edit"
            />
          ))}
        <CreateButton href="/page_config/create" className="mt-2" />
      </div>
    </div>
  );
}
