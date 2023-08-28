import mysql from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const db = (await mysql.query(
    "INSERT INTO `service_config`(created_at, updated_at, name, priority, active, app_version, base_action, static_info, fallback_info, content_type, content_structure, base_activity_name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      new Date(body.created_at),
      new Date(body.updated_at),
      body.name,
      body.priority,
      body.active,
      body.app_version,
      body.base_action,
      body.static_info,
      body.fallback_info,
      body.content_type,
      body.content_structure,
      body.base_activity_name,
    ]
  )) as { insertId: number };

  await mysql.query(
    "INSERT INTO `page_section_service_mapping`(page_section_id, service_id) VALUES(?, ?)",
    [body.page_section_id, db.insertId]
  );

  return NextResponse.json({
    data: {
      id: db.insertId,
    },
  });
}

const allowedKeys = [
  "name",
  "active",
  "priority",
  "update_at",
  "created_at",
  "app_version",
  "base_action",
  "static_info",
  "fallback_info",
  "content_type",
  "content_structure",
  "base_activity_name",
];
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  if (!body.id)
    return NextResponse.json({
      message: "id is required",
    });
  const validKeys = Object.keys(body).filter((k) => allowedKeys.includes(k));
  if (body.page_section_id) {
    await mysql.query(
      "UPDATE `page_section_service_mapping` SET page_section_id = ? WHERE service_id = ?",
      [body.page_section_id, body.id]
    );
    delete body.page_section_id;
    if (validKeys.keys.length === 0) {
      return NextResponse.json({
        data: {
          id: body.id,
        },
      });
    }
  }

  if (validKeys.length === 0)
    return NextResponse.json({
      message: "no valid keys",
    });

  const sqlQuery = `UPDATE \`service_config\` SET ${validKeys
    .map((k) => `${k} = ?`)
    .join(", ")} WHERE id = ?`;

  const values = validKeys.map((k) =>
    k.endsWith("_at") ? new Date(body[k]) : body[k]
  );
  await mysql.query(sqlQuery, [...values, body.id]);
  return NextResponse.json({
    data: {
      id: body.id,
    },
  });
}
