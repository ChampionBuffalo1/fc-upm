"use client";

import { Info } from "lucide-react";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { RequiredMark } from "@/types/util";
import { useCallback, useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";

export default function CreatePage() {
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
      priority: number;
      active: number;
      page_config_id: number;
    }) =>
      fetch("/api/page_section", {
        method: "PUT",
        body: JSON.stringify({
          active: value.active,
          priority: value.priority,
          page_config_id: value.page_config_id,
          created_at: value["ca-picker"].toISOString(),
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
      <Form
        className="w-72 p-4"
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={requiredMark}
        onValuesChange={onRequiredTypeChange}
        initialValues={{ requiredMarkValue: requiredMark }}
      >
        <Form.Item
          name="ca-pickerV"
          label={<label className="text-white"> Created At</label>}
          rules={[
            {
              type: "object" as const,
              required: true,
              message: "Please select time!",
            },
          ]}
          initialValue={dayjs(new Date())}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          name="page_config_id"
          label={<label className="text-white">Page Id</label>}
          rules={[
            {
              required: true,
              message: "Please provide Page Id",
              pattern: new RegExp(/^[0-9]+$/),
            },
          ]}
          tooltip={{
            title: "This is a required field",
            icon: <Info size={16} color="white" />,
          }}
          initialValue={1}
        >
          <Input placeholder="Priority" />
        </Form.Item>
        <Form.Item
          name="priority"
          label={<label className="text-white">Priority</label>}
          rules={[
            {
              required: true,
              message: "Please provide priority",
              pattern: new RegExp(/^[0-9]+$/),
            },
          ]}
          tooltip={{
            title: "This is a required field",
            icon: <Info size={16} color="white" />,
          }}
          initialValue={1}
        >
          <Input placeholder="Priority" />
        </Form.Item>
        <Form.Item
          name="active"
          label={<label className="text-white">Active</label>}
          rules={[
            {
              pattern: new RegExp(/^[0-9]+$/),
              required: true,
            },
          ]}
          tooltip={{
            title: "This is a required field",
            icon: <Info size={16} color="white" />,
          }}
          initialValue={0}
        >
          <Input placeholder="Active" />
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
