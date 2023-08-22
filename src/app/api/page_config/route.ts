import mysql from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await mysql.query("SELECT id, name FROM `page_config`");
  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  if (!data.name)
    return NextResponse.json({
      message: "name is required",
    });

  const db = (await mysql.query(
    "INSERT INTO `page_config`(created_at, name) VALUES(?, ?)",
    [data.created_at ? new Date(data.created_at) : new Date(), data.name]
  )) as { insertId: number };

  return NextResponse.json({
    data: {
      id: db.insertId,
      name: data.name,
    },
  });
}

const allowedKeys = ["name", "created_at", "update_at"];
export async function PATCH(req: NextRequest) {
  const data = await req.json();
  if (!data.id)
    return NextResponse.json({
      message: "id is required",
    });

  const validKeys = Object.keys(data).filter((k) => allowedKeys.includes(k));

  const sqlQuery = `UPDATE \`page_config\` SET ${validKeys
    .map((k) => `${k} = ?`)
    .join(", ")} WHERE id = ?`;

  const values = validKeys.map((k) =>
    k !== "name" ? new Date(data[k]) : data[k]
  );

  await mysql.query(sqlQuery, [...values, data.id]);

  return NextResponse.json({
    data: {
      id: data.id,
    },
  });
}
