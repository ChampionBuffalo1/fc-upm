import clsx from "clsx";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { PageConfig } from "@/types/db";

export default function PageCard({
  id,
  name,
  className,
}: PageConfig & { className?: string }) {
  return (
    <div className={clsx("flex w-44 bg-white p-4 rounded-md mx-2", className)}>
      <span className="text-black">{name}</span>
      <div className="w-full flex flex-row-reverse items-center">
        <Link
          href={{
            pathname: "/page_config/edit",
            query: {
              id,
            },
          }}
        >
          <Pencil size={16} className="text-red-400" />
        </Link>
      </div>
    </div>
  );
}
