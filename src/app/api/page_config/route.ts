import mysql from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await mysql.query("SELECT * FROM `page_config`");
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.name)
    return NextResponse.json({
      message: "name is required",
    });
  // TODO: Removed created_at if its not in the data
  const db = await mysql.query(
    "INSERT INTO `page_config`(created_at, name) VALUES(?, ?)",
    [new Date(data.createdAt), data.name]
  );
  return NextResponse.json({
    data: db,
  });
}
