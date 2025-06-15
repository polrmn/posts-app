"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostInput, postSchema } from "@/validation/postSchema";
import { message } from "antd";
import { addPostPending, editPostPending } from "@/store/post/slice";
import { getError, getIsLoading } from "@/store/post/selectors";

export const usePostForm = (
  mode: "create" | "edit",
  initialValues?: PostInput,
  postId?: string
) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const isLoading = useAppSelector(getIsLoading);
  const error = useAppSelector(getError);

  const form = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: initialValues ?? { title: "", content: "" },
  });

  const onSubmit = (data: PostInput) => {
    if (mode === "edit" && postId) {
      dispatch(editPostPending({ id: postId, ...data }));
    } else {
      dispatch(addPostPending(data));
    }
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful && !isLoading && !error) {
      messageApi.success({
        content: mode === "edit" ? "Post updated!" : "Post created!",
        duration: 1,
        onClose: () => router.push("/"),
      });
    } else if (error) {
      messageApi.error(error);
    }
  }, [isLoading, error, form.formState.isSubmitSuccessful]);

  return {
    ...form,
    contextHolder,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    errors: form.formState.errors,
    control: form.control,
  };
};
