import Link from "next/link";
import { Pencil } from "lucide-react";
import { PageConfig } from "@/types/db";

export default function PageCard({ id, name }: PageConfig) {
  return (
    <div className="bg-white mx-2 p-4 flex items-center rounded-md justify-between">
      <Link
        href={{
          pathname: "/page_section",
          query: {
            id,
          },
        }}
      >
        <span className="text-black">{name}</span>
      </Link>
      <Link
        href={{
          pathname: "/page_config/edit",
          query: {
            id,
          },
        }}
        className="px-2 "
      >
        <Pencil size={16} className="text-red-400" />
      </Link>
    </div>
  );
}
