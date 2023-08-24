"use client";

import dayjs from "dayjs";
import { ReactNode, useState } from "react";
import { RequiredMark } from "@/types/util";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";

export type FormField = {
  name: string;
  label: string | ReactNode;
  placeholder?: string;
  required?: string;
  type: "date" | "number" | "string" | "json";
  initialValue?: string | number | Date;
  // Only use if type === number
  min?: number;
  max?: number;
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
            field.type === "json"
              ? {
                  validator: async (_, value) => {
                    if (field.type === "json") {
                      if (value) {
                        try {
                          JSON.parse(value);
                        } catch (e) {
                          return Promise.reject("Invalid JSON");
                        }
                      } else {
                        return !!field.required
                          ? Promise.reject(field.required)
                          : Promise.resolve();
                      }
                    }
                  },
                  required: !!field.required,
                }
              : {
                  type: field.type !== "number" ? field.type : undefined,
                  required: !!field.required,
                  message: field.required,
                  pattern:
                    field.type === "number"
                      ? new RegExp(/^[0-9]+$/)
                      : undefined,
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
          ) : field.type === "number" ? (
            <InputNumber min={field.min} max={field.max} className="w-full" />
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
