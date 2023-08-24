"use client";

import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import JsonForm, { FormField } from "@/components/Forms";

export default function CreatePage() {
  const router = useRouter();

  const handleSubmit = useCallback(
    (value: {
      active: number;
      priority: number;
      created_at?: Dayjs;
      page_config_id: number;
    }) =>
      fetch("/api/page_section", {
        method: "PUT",
        body: JSON.stringify({
          ...value,
          created_at: value["created_at"] || new Date(),
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
    [router]
  );

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <span className="text-xl mb-8">New Section</span>
      <JsonForm fields={fields} submit={handleSubmit} />
    </div>
  );
}

const fields: FormField = [
  {
    type: "date",
    required: "Created At is required",
    name: "created_at",
    label: (
      <div className="flex flex-col">
        <label className="text-white">Created At</label>
        <em className="text-gray-500 hover:text-gray-200 text-xs">
          This will be set to current time when you submit
        </em>
      </div>
    ),
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
];
