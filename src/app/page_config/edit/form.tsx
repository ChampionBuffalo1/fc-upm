"use client";

import { Dayjs } from "dayjs";
import { PageConfig } from "@/types/db";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import JsonForm, { FormField } from "@/components/Forms";

export default function EditForm({
  id,
  created_at,
  updated_at,
  name,
}: PageConfig) {
  const router = useRouter();
  const fields: FormField = useMemo(
    () => [
      {
        type: "date",
        required: "This is a required field",
        name: "created_at",
        label: "Created At",
        initialValue: created_at,
      },
      {
        type: "date",
        required: "This is a required field",
        name: "updated_at",
        label: (
          <div className="flex flex-col">
            <label className="text-white">Updated At</label>
            <em className="text-gray-500 hover:text-gray-200 text-xs">
              This will be set to current time when you submit
            </em>
          </div>
        ),
        initialValue: updated_at,
      },
      {
        name: "name",
        label: "Name",
        required: "Please provide a name",
        type: "string",
        initialValue: name,
      },
    ],
    [name, created_at, updated_at]
  );

  const handleSubmit = useCallback(
    (value: { created_at: Dayjs; updated_at: Dayjs; name: string }) =>
      fetch("/api/page_config", {
        method: "PATCH",
        body: JSON.stringify({
          id,
          ...value,
          updated_at: value["updated_at"] || new Date(),
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
      <span className="text-2xl">Editing &quot;{name}&quot; config</span>
      <JsonForm fields={fields} submit={handleSubmit} />
    </div>
  );
}
