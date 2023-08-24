"use client";

import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import JsonForm, { FormField } from "@/components/Forms";

export default function CreatePage() {
  const router = useRouter();

  const handleSubmit = useCallback(
    (value: Record<string, Dayjs | string>) =>
      fetch("/api/service_config", {
        method: "PUT",
        body: JSON.stringify(value),
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
      <span className="text-xl mb-8">New Service</span>
      <div>
        <JsonForm fields={fields} submit={handleSubmit} layout="horizontal" />
      </div>
    </div>
  );
}

const fields: FormField = [
  {
    type: "date",
    required: "This is a required field",
    name: "created_at",
    label: "Created At",
  },
  {
    type: "date",
    required: "This is a required field",
    name: "updated_at",
    label: "Updated At",
  },
  {
    name: "name",
    label: "Name",
    type: "string",
    required: "Name must be provided",
    placeholder: "Service Name",
  },
  {
    type: "number",
    name: "priority",
    label: "Priority",
    placeholder: "Service Priority",
    required: "Priority must be a number",
  },
  {
    type: "number",
    name: "active",
    label: "Active",
    placeholder: "Active state",
    required: "Active must be a number",
  },
  {
    type: "json",
    name: "app_version",
    label: "App Version",
    placeholder: "App Version",
    required: "This is a required field",
  },
  {
    type: "json",
    name: "base_action",
    label: "Base Action",
    placeholder: "Base Action",
  },
  {
    type: "json",
    name: "static_info",
    label: "Static Info",
    placeholder: "Static Info",
  },
  {
    type: "json",
    name: "fallback_info",
    label: "Fallback Info",
    placeholder: "Fallback Info",
  },
  {
    type: "string",
    name: "content_type",
    label: "Content Type",
    placeholder: "Content Type",
    required: "This field is required",
  },
  {
    type: "json",
    name: "content_structure",
    label: "Content Structure",
    placeholder: "Content Structure",
    required: "This field is required",
  },
  {
    type: "string",
    name: "base_activity_name",
    label: "Base Activity Name",
    placeholder: "Base Activity Name",
  },
];
