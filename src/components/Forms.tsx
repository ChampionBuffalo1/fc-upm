"use client";

import dayjs from "dayjs";
import { useState } from "react";
import { RequiredMark } from "@/types/util";
import { Button, DatePicker, Form, Input } from "antd";

export type FormField = {
  name: string;
  label: string;
  required?: string;
  type: "date" | "number" | "string";
  initialValue?: string | number | Date;
}[];

export default function JsonForm({
  fields,
  submit,
}: {
  fields: FormField;
  submit: (value: any) => void;
}) {
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

  return (
    <Form
      className="w-full pt-4"
      form={form}
      layout="vertical"
      onFinish={submit}
      requiredMark={requiredMark}
      onValuesChange={onRequiredTypeChange}
      initialValues={{ requiredMarkValue: requiredMark }}
    >
      {fields.map((field, key) => (
        <Form.Item
          key={key}
          name={field.name}
          label={<label className="text-white">{field.label}</label>}
          rules={[
            {
              type: field.type,
              required: !!field.required,
              message: field.required,
              pattern:
                field.type === "number" ? new RegExp(/^[0-9]+$/) : undefined,
            },
          ]}
          initialValue={
            field.type === "date"
              ? dayjs(field.initialValue)
              : field.initialValue
          }
        >
          {field.type === "date" ? (
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          ) : (
            <Input placeholder={field.label} />
          )}
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
