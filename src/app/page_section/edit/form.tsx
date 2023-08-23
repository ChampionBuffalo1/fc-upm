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
        name: "ca-picker",
        label: "Created At",
        required: "Please input created_at!",
        type: "date",
        initialValue: created_at,
      },
      {
        name: "ua-picker",
        label: "Updated At",
        required: "Please input updated_at!",
        type: "date",
        initialValue: updated_at,
      },
      {
        name: "active",
        label: "Active",
        required: "Please input active!",
        type: "number",
        initialValue: active,
      },
      {
        name: "priority",
        label: "Priority",
        required: "Please input priority!",
        type: "number",
        initialValue: priority,
      },
      {
        type: "number",
        name: "page_config_id",
        label: "Page Config Id",
        required: "Please input page_config_id!",
        initialValue: page_config_id,
      },
    ],
    []
  );
  const handleSubmit = useCallback(
    (value: {
      "ca-picker": Dayjs;
      "ua-picker": Dayjs;
      priority: string;
      active: string;
      page_config_id: string;
    }) =>
      fetch("/api/page_section", {
        method: "PATCH",
        body: JSON.stringify({
          id,
          active: parseInt(value.active),
          priority: parseInt(value.priority),
          page_config_id: parseInt(value.page_config_id),
          created_at: value["ca-picker"].toISOString(),
          updated_at:
            value["ua-picker"]?.toISOString() || new Date().toISOString(),
        }),
      })
        .then(() => {
          router.refresh();
          router.back();
        })
        .catch(console.error),
    [id, router]
  );

  return (
    <div>
      <span className="text-2xl">Editing Page Section</span>
      <JsonForm fields={fields} submit={handleSubmit} key={id} />
    </div>
  );
}
