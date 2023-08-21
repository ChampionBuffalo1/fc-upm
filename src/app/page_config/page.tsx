import Link from "next/link";
import mysql from "@/lib/mysql";
import { PageConfig } from "@/types/db";
import { PlusCircle } from "lucide-react";
import PageCard from "@/components/PageCard";

export default async function Home() {
  const data = (await mysql.query(
    "SELECT id, name FROM `page_config`"
  )) as PageConfig[];

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <span className="text-xl m-4">Services</span>
      <div className="flex justify-center">
        {data.length !== 0 &&
          data.map((config) => <PageCard key={config.id} {...config} />)}
        <Link href="/create">
          <button className="bg-white mx-2 w-44 p-4 text-xl rounded-md text-black flex justify-center items-center">
            <PlusCircle size={26} className="text-red-600" />
          </button>
        </Link>
      </div>
    </div>
  );
}
