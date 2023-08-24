"use client";

import dayjs from "dayjs";
import { ReactNode, useState } from "react";
import { RequiredMark } from "@/types/util";
import { Button, DatePicker, Form, Input } from "antd";

export type FormField = {
  name: string;
  required?: string;
  placeholder?: string;
  label: string | ReactNode;
  type: "date" | "number" | "string";
  initialValue?: string | number | Date;
}[];

export default function JsonForm({
  fields,
  submit,
  layout,
}: {
  fields: FormField;
  submit: (value: any) => void;
  layout?: "vertical" | "horizontal";
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
      layout={layout || "vertical"}
      onFinish={submit}
      requiredMark={requiredMark}
      onValuesChange={onRequiredTypeChange}
      initialValues={{ requiredMarkValue: requiredMark }}
    >
      {fields.map((field, key) => (
        <Form.Item
          key={key}
          name={field.name}
          label={
            typeof field.label === "string" ? (
              <label className="text-white">{field.label}</label>
            ) : (
              field.label
            )
          }
          rules={[
            {
              type: field.type !== "number" ? field.type : undefined,
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
            <Input placeholder={field.placeholder || field.name} />
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
