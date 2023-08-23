import clsx from "clsx";
import Link from "next/link";
import { Pencil } from "lucide-react";

interface PageCardProps {
  pid: number;
  name: string;
  editHref: string;
  clickHref?: string;
  className?: string;
}

export default function PageCard({
  pid,
  name,
  editHref,
  clickHref,
  className,
}: PageCardProps) {
  return (
    <div
      className={clsx(
        "bg-white mt-2 mx-2 p-4 flex items-center rounded-md justify-between",
        className
      )}
    >
      {clickHref && (
        <Link
          href={{
            pathname: clickHref,
            query: {
              id: pid,
            },
          }}
        >
          <span className="text-black">{name}</span>
        </Link>
      )}
      {!clickHref && <span className="text-black">{name}</span>}
      <Link
        href={{
          pathname: editHref,
          query: {
            id: pid,
          },
        }}
        className="px-2 "
      >
        <Pencil size={16} className="text-red-400" />
      </Link>
    </div>
  );
}
