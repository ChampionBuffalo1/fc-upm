"use client";

import dayjs, { Dayjs } from "dayjs";
import { ServiceConfig } from "@/types/db";
import { RequiredMark } from "@/types/util";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";

export default function EditForm({
  id,
  name,
  active,
  priority,
  created_at,
  updated_at,
  app_version,
  base_action,
  static_info,
  content_type,
  fallback_info,
  content_structure,
  base_activity_name,
}: ServiceConfig) {
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
      active: string;
      priority: string;
      "ca-picker": Dayjs;
      "ua-picker": Dayjs;
      page_config_id: string;
    }) =>
      fetch("/api/search_config", {
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
    <div className="overflow-scroll">
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
          name="name"
          label={<label className="text-white">Page Config Id</label>}
          rules={[
            {
              type: "string" as const,
              required: true,
              message: "Each service must have a name",
            },
          ]}
          initialValue={name}
        >
          <Input placeholder="name" />
        </Form.Item>

        <Form.Item
          name="app_version"
          label={<label className="text-white">App Version</label>}
          rules={[
            {
              type: "string",
              required: true,
            },
          ]}
          initialValue={JSON.stringify(app_version)}
        >
          <Input placeholder="app_version" />
        </Form.Item>

        <Form.Item
          name="base_action"
          label={<label className="text-white">Base Action</label>}
          rules={[
            {
              type: "string",
              required: true,
            },
          ]}
          initialValue={JSON.stringify(base_action)}
        >
          <Input placeholder="Base Action" />
        </Form.Item>

        <Form.Item
          name="static_info"
          label={<label className="text-white">Static Info</label>}
          rules={[
            {
              type: "string",
              required: true,
            },
          ]}
          initialValue={JSON.stringify(static_info)}
        >
          <Input placeholder="Static Info" />
        </Form.Item>

        <Form.Item
          name="fallback_info"
          label={<label className="text-white">Fallback Info</label>}
          rules={[
            {
              type: "string",
            },
          ]}
          initialValue={JSON.stringify(fallback_info) || ""}
        >
          <Input placeholder="Fallback Info" />
        </Form.Item>

        <Form.Item
          name="content_type"
          label={<label className="text-white">Fallback Info</label>}
          rules={[
            {
              type: "string",
            },
          ]}
          initialValue={JSON.stringify(content_type) || ""}
        >
          <Input placeholder="Base Action" />
        </Form.Item>

        <Form.Item
          name="content_structure"
          label={<label className="text-white">Content Structure</label>}
          rules={[
            {
              type: "string",
              required: true,
            },
          ]}
          initialValue={JSON.stringify(content_structure) || ""}
        >
          <Input placeholder="Content Structure" />
        </Form.Item>

        <Form.Item
          name="base_activity_name"
          label={<label className="text-white">Base Activity Name</label>}
          rules={[
            {
              type: "string",
              required: false,
            },
          ]}
          initialValue={base_activity_name}
        >
          <Input placeholder="Base Activity Name" />
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
