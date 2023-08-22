"use client";

import { Info } from "lucide-react";
import dayjs, { Dayjs } from "dayjs";
import { PageConfig } from "@/types/db";
import { RequiredMark } from "@/types/util";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";

export default function EditForm({
  id,
  created_at,
  updated_at,
  name,
}: PageConfig) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] =
    useState<RequiredMark>("optional");

  const onRequiredTypeChange = ({
    requiredMarkValue,
  }: {
    requiredMarkValue: RequiredMark;
  }) => {
    setRequiredMarkType(requiredMarkValue);
  };

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
    [router]
  );

  return (
    <div>
      <span className="text-2xl">Editing "{name}" config</span>
      <Form
        className="w-full pt-4"
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={requiredMark}
        onValuesChange={onRequiredTypeChange}
        initialValues={{ requiredMarkValue: requiredMark }}
      >
        <Form.Item
          name="ca-picker"
          label={<label className="text-white"> Created At</label>}
          rules={[
            {
              type: "object" as const,
              required: true,
              message: "Please select time!",
            },
          ]}
          initialValue={dayjs(created_at)}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.Item
          name="ua-picker"
          label={
            <div className="flex flex-col">
              <label className="text-white"> Updated At</label>
              <em className="text-gray-500 hover:text-gray-200 text-xs">
                This will be updated to current time when you submit
              </em>
            </div>
          }
          rules={[
            {
              type: "object" as const,
              required: true,
              message: "Please select time!",
            },
          ]}
          initialValue={dayjs(updated_at)}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.Item
          name="name"
          label={<label className="text-white"> Name</label>}
          rules={[
            {
              type: "string" as const,
            },
          ]}
        >
          <Input placeholder="name" defaultValue={name} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
