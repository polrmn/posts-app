import { usePostForm } from "@/hooks/usePostForm";
import { Button, Form, Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const PostForm = ({ mode }: { mode: "create" | "edit" }) => {
  const { control, errors, isLoading, contextHolder, onSubmit } =
    usePostForm(mode);
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      {contextHolder}
      <Form.Item
        label="Title"
        validateStatus={errors.title ? "error" : ""}
        help={errors.title?.message}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Content"
        validateStatus={errors.content ? "error" : ""}
        help={errors.content?.message}
      >
        <Controller
          name="content"
          control={control}
          render={({ field }) => <Input.TextArea {...field} rows={5} />}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
