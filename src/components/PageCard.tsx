import clsx from "clsx";
import Link from "next/link";
import { Pencil } from "lucide-react";

interface PageCardProps {
  pid: number;
  name: string;
  editHref: string;
  clickHref: string;
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
        "bg-white mx-2 p-4 flex items-center rounded-md justify-between",
        className
      )}
    >
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

// <div className="bg-white mx-2 px-2 flex flex-col rounded-md">
//   <div className="flex flex-row-reverse py-2">
//     <X size={16} className="text-red-400 cursor-pointer" />
//   </div>
//   <div className="flex">
//     <Link
//       href={{
//         pathname: clickHref,
//         query: {
//           id: pid,
//         },
//       }}
//     >
//       <span className="text-black pr-8">{name}</span>
//     </Link>
//     <Link
//       href={{
//         pathname: editHref,
//         query: {
//           id: pid,
//         },
//       }}
//       // className="absolute right-4 top-4"
//     >
//       <Pencil size={16} className="text-red-400" />
//     </Link>
//   </div>{" "}
// </div>
