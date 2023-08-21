"use client";

import { Info } from "lucide-react";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";

type RequiredMark = boolean | "optional";

export default function CreatePage() {
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
    (value: { "dt-picker": Dayjs; name: string }) =>
      fetch("/api/page_config", {
        method: "POST",
        body: JSON.stringify({
          createdAt: value["dt-picker"].toISOString(),
          name: value.name,
        }),
      }),
    []
  );

  return (
    <div className="flex justify-center items-center w-full h-full">
      <span>Text</span>
      <Form
        className="w-72"
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={requiredMark}
        onValuesChange={onRequiredTypeChange}
        initialValues={{ requiredMarkValue: requiredMark }}
      >
        <Form.Item
          name="dt-picker"
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
          name="name"
          label={<label className="text-white"> Name</label>}
          rules={[
            {
              type: "string" as const,
              required: true,
              message: "Please provide a name",
            },
          ]}
          tooltip={{
            title: "This is a required field",
            icon: <Info size={16} color="white" />,
          }}
        >
          <Input placeholder="Name" />
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
