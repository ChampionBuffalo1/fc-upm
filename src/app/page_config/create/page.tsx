"use client";

import { Info } from "lucide-react";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";

type RequiredMark = boolean | "optional";

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
    (value: { "ca-picker": Dayjs; name: string }) =>
      fetch("/api/page_config", {
        method: "PUT",
        body: JSON.stringify({
          created_at: value["ca-picker"].toISOString(),
          name: value.name,
        }),
      }).then(() => {
        router.refresh();
        router.back();
      }),
    [router]
  );

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <span className="text-xl mb-8">config details</span>
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
          name="ca-picker"
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
