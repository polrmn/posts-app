"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { PostInput, postSchema } from "@/validation/postSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getError, getIsLoading } from "@/store/post/selectors";
import { addPostPending } from "@/store/post/slice";
import { useEffect } from "react";
import styles from "./page.module.css";

const { Title } = Typography;

export default function CreatePostPage() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(getIsLoading);
  const error = useAppSelector(getError);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostInput) => {
    dispatch(addPostPending(data));
  };

  useEffect(() => {
    if (!isLoading && !error && isSubmitSuccessful) {
      messageApi.success({
        content: "Post created successfully!",
        duration: 1,
        onClose: () => router.push("/"),
      });
    }
    if (error) {
      messageApi.error(error);
    }
  }, [isLoading, error, isSubmitSuccessful]);

  return (
    <main className={styles.container}>
      {contextHolder}
      <Title level={2}>Create new post</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Title"
          validateStatus={errors.title ? "error" : ""}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input {...field} placeholder="Write title here..." />
            )}
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
            defaultValue=""
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder="Write text here..."
                rows={6}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
}
