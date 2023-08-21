import Link from "next/link";

const services = ["Page Config", "Page Section", "Service Config"];

export default async function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <span className="text-2xl m-8">Services</span>
      <div className="flex justify-center">
        {services.length !== 0 &&
          services.map((name, id) => (
            <Link href={`/${name.replaceAll(" ", "_").toLowerCase()}`} key={id}>
              <div className="flex w-44 bg-white p-4 rounded-md mx-2">
                <span className="text-black">{name}</span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
