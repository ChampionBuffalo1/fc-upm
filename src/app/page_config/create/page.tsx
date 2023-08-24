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
        required: "Created at is required",
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
        type: "date",
        required: "Updated At is required",
        name: "updated_at",
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
        name: "name",
        label: "Name",
        required: "Please provide a name",
        type: "string",
      },
    ],
    []
  );

  const handleSubmit = useCallback(
    (value: { created_at: Dayjs; updated_at: Dayjs; name: string }) =>
      fetch("/api/page_config", {
        method: "PUT",
        body: JSON.stringify(value),
      }).then(() => {
        router.refresh();
        router.back();
      }),
    [router]
  );

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <span className="text-xl mb-8">New Page</span>
      <JsonForm fields={fields} submit={handleSubmit} />
    </div>
  );
}
