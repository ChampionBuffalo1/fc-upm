"use client";

import { Dayjs } from "dayjs";
import { PageSection } from "@/types/db";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import JsonForm, { FormField } from "@/components/Forms";

export default function EditForm({
  id,
  active,
  priority,
  created_at,
  updated_at,
  page_config_id,
}: PageSection) {
  const router = useRouter();
  const fields: FormField = useMemo(
    () => [
      {
        name: "created_at",
        label: "Created At",
        required: "This field is required",
        type: "date",
        initialValue: created_at,
      },
      {
        name: "updated_at",
        label: "Updated At",
        required: "This field is required",
        type: "date",
        initialValue: updated_at,
      },
      {
        name: "active",
        label: "Active",
        required: "Active must be a number",
        type: "number",
        initialValue: active,
      },
      {
        name: "priority",
        label: "Priority",
        required: "priority must be a number",
        type: "number",
        initialValue: priority,
      },
      {
        type: "number",
        name: "page_config_id",
        label: "Page Config Id",
        required: "Config Id must be a number",
        initialValue: page_config_id,
      },
    ],
    [active, created_at, page_config_id, priority, updated_at]
  );
  const handleSubmit = useCallback(
    (value: {
      active: string;
      priority: string;
      created_at: Dayjs;
      updated_at: Dayjs;
      page_config_id: string;
    }) =>
      fetch("/api/page_section", {
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
      <JsonForm fields={fields} submit={handleSubmit} key={id} />
    </div>
  );
}
