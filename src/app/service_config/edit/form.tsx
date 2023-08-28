"use client";

import { ServiceConfig } from "@/types/db";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import JsonForm, { FormField } from "@/components/Forms";

export default function EditForm({
  id,
  name,
  active,
  priority,
  created_at,
  updated_at,
  app_version,
  base_action,
  static_info,
  content_type,
  fallback_info,
  page_section_id,
  content_structure,
  base_activity_name,
}: ServiceConfig) {
  const router = useRouter();
  const fields: FormField = useMemo(
    () => [
      {
        type: "date",
        name: "created_at",
        label: "Created At",
        initialValue: created_at,
        required: "This is a required field",
      },
      {
        type: "date",
        required: "This is a required field",
        name: "updated_at",
        label: "Updated At",
        initialValue: updated_at,
      },
      {
        name: "name",
        label: "Name",
        type: "string",
        placeholder: "Service Name",
        required: "Name must be provided",
        initialValue: name,
      },
      {
        type: "number",
        name: "priority",
        label: "Priority",
        placeholder: "Service Priority",
        required: "Priority must be a number",
        initialValue: priority,
      },
      {
        type: "number",
        name: "active",
        label: "Active",
        placeholder: "Active state",
        required: "Active must be a number",
        initialValue: active,
      },
      {
        type: "json",
        name: "app_version",
        label: "App Version",
        placeholder: "App Version",
        required: "This field is required",
        initialValue: JSON.stringify(app_version),
      },
      {
        type: "json",
        name: "base_action",
        label: "Base Action",
        placeholder: "Base Action",
        initialValue: JSON.stringify(base_action),
      },
      {
        type: "json",
        name: "static_info",
        label: "Static Info",
        placeholder: "Static Info",
        initialValue: JSON.stringify(static_info),
      },
      {
        type: "json",
        name: "fallback_info",
        label: "Fallback Info",
        placeholder: "Fallback Info",
        initialValue: JSON.stringify(fallback_info),
      },
      {
        type: "string",
        name: "content_type",
        label: "Content Type",
        placeholder: "Content Type",
        required: "This field is required",
        initialValue: content_type,
      },
      {
        type: "json",
        name: "content_structure",
        label: "Content Structure",
        placeholder: "Content Structure",
        required: "This field is required",
        initialValue: JSON.stringify(content_structure),
      },
      {
        type: "string",
        name: "base_activity_name",
        label: "Base Activity Name",
        placeholder: "Base Activity Name",
        initialValue: base_activity_name,
      },
      {
        type: "number",
        name: "page_section_id",
        label: "Page Section ID",
        initialValue: page_section_id,
        placeholder: "Page Section ID",
        required: "Each section must have a page config id",
      },
    ],
    [
      name,
      active,
      priority,
      created_at,
      updated_at,
      app_version,
      base_action,
      static_info,
      content_type,
      fallback_info,
      page_section_id,
      content_structure,
      base_activity_name,
    ]
  );

  const handleSubmit = useCallback(
    (value: Record<string, unknown>) =>
      fetch("/api/service_config", {
        method: "PATCH",
        body: JSON.stringify({
          id,
          ...value,
          updated_at: value["updated_at"] || new Date(),
        }),
      })
        .then((req) => req.json())
        .then((json) => {
          if (json.data.id) {
            router.refresh();
            router.back();
          } else {
            console.error("Unknown Error", json);
          }
        }),
    [id, router]
  );

  return (
    <div>
      <span className="text-2xl">Editing Page Section</span>
      <JsonForm fields={fields} submit={handleSubmit} layout="horizontal" />
    </div>
  );
}
