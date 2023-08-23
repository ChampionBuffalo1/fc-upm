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
        name: "ca-picker",
        label: "Created At",
        initialValue: created_at,
      },
      {
        type: "date",
        required: "This is a required field",
        name: "ua-picker",
        label: "Updated At",
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
    (value: { "ca-picker": Dayjs; "ua-picker": Dayjs; name: string }) =>
      fetch("/api/page_config", {
        method: "PATCH",
        body: JSON.stringify({
          id,
          created_at: value["ca-picker"].toISOString(),
          updated_at: value["ua-picker"].toISOString(),
          name: value.name,
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
