import Link from "next/link";
import { PlusCircle } from "lucide-react";
import clsx from "clsx";

export default function CreateButton({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <Link href={href}>
      <button
        className={clsx(
          "bg-white mx-2 w-44 p-4 text-xl rounded-md flex justify-center items-center",
          className
        )}
      >
        <PlusCircle size={26} className="text-red-600" />
      </button>
    </Link>
  );
}
