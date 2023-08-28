import mysql from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";

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
  if (validKeys.length === 0)
    return NextResponse.json({
      message: "no valid keys",
    });

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
