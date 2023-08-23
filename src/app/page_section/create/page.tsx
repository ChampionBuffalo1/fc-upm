"use client";

import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import JsonForm, { FormField } from "@/components/Forms";

export default function CreatePage() {
  const router = useRouter();
  const fields: FormField = useMemo(
    () => [
      {
        type: "date",
        name: "ca-picker",
        label: "Created At",
        required: "Created At is required",
      },
      {
        type: "number",
        name: "page_config_id",
        label: "Page Id",
        required: "Page Id is required",
      },
      {
        type: "number",
        name: "priority",
        label: "Priority",
        required: "Priority is required",
      },

      {
        type: "number",
        name: "active",
        label: "Active",
        required: "Active is required",
      },
    ],
    []
  );

  const handleSubmit = useCallback(
    (value: {
      active: number;
      priority: number;
      "ca-picker"?: Dayjs;
      page_config_id: number;
    }) =>
      fetch("/api/page_section", {
        method: "PUT",
        body: JSON.stringify({
          active: value.active,
          priority: value.priority,
          page_config_id: value.page_config_id,
          created_at:
            value["ca-picker"]?.toISOString() || new Date().toISOString(),
        }),
      }).then(() => {
        router.refresh();
        router.back();
      }),
    [router]
  );

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <span className="text-xl mb-8">New Section</span>
      <JsonForm fields={fields} submit={handleSubmit} />
    </div>
  );
}
