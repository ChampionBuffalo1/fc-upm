"use client";

import dayjs, { Dayjs } from "dayjs";
import { PageSection } from "@/types/db";
import { RequiredMark } from "@/types/util";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";

export default function EditForm({
  id,
  active,
  priority,
  created_at,
  updated_at,
  page_config_id,
}: PageSection) {
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
            },
          ]}
          initialValue={dayjs(updated_at)}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.Item
          name="priority"
          label={<label className="text-white">Priority</label>}
          rules={[
            {
              required: true,
              message: "Priority must be a number",
              pattern: new RegExp(/^[0-9]+$/),
            },
          ]}
          initialValue={priority}
        >
          <Input placeholder="priority" />
        </Form.Item>
        <Form.Item
          name="active"
          label={<label className="text-white">Active</label>}
          rules={[
            {
              required: true,
              message: "Active must be a number",
              pattern: new RegExp(/^[0-9]+$/),
            },
          ]}
          initialValue={active}
        >
          <Input placeholder="active" />
        </Form.Item>
        <Form.Item
          name="page_config_id"
          label={<label className="text-white">Page Config Id</label>}
          rules={[
            {
              required: true,
              message: "Each section must be associated with a page config",
              pattern: new RegExp(/^[0-9]+$/),
            },
          ]}
          initialValue={page_config_id}
        >
          <Input placeholder="Page config Id" />
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
