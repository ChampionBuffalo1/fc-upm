import Link from "next/link";
import PageCard from "@/components/PageCard";

const services = ["Page Config", "Page Section", "Service Config"];

export default async function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <span className="text-xl m-4">Services</span>
      <div className="flex justify-center">
        {services.length !== 0 &&
          services.map((name, id) => (
            <Link href={`/${name.replaceAll(" ", "_").toLowerCase()}`}>
              <PageCard key={id} name={name} />
            </Link>
          ))}
      </div>
    </div>
  );
}
