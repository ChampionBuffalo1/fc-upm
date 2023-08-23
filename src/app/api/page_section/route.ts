import mysql from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const db = (await mysql.query(
    "INSERT INTO `page_section`(priority, active, page_config_id, created_at) VALUES(?, ?, ?, ?)",
    [body.priority, body.active, body.page_config_id, new Date(body.created_at)]
  )) as { insertId: number };

  return NextResponse.json({
    data: {
      id: db.insertId,
    },
  });
}

const allowedKeys = ["name", "created_at", "update_at", "priority", "active"];
export async function PATCH(req: NextRequest) {
  const body = await req.json();

  if (!body.id)
    return NextResponse.json({
      message: "id is required",
    });

  const validKeys = Object.keys(body).filter((k) => allowedKeys.includes(k));
  if (validKeys.length === 0)
    return NextResponse.json({
      message: "no valid keys",
    });

  const sqlQuery = `UPDATE \`page_section\` SET ${validKeys
    .map((k) => `${k} = ?`)
    .join(", ")} WHERE id = ?`;

  const values = validKeys.map((k) =>
    k.endsWith("_at") ? new Date(body[k]) : body[k]
  );
  await mysql.query(sqlQuery, [...values, body.id]);
  return NextResponse.json({
    body: {
      id: body.id,
    },
  });
}
