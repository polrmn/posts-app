"use client";

import { Typography } from "antd";
import styles from "./page.module.css";
import PostForm from "../components/PostForm";

const { Title } = Typography;

export default function CreatePostPage() {
  return (
    <main className={styles.container}>
      <Title level={2}>Create new post</Title>
      <PostForm mode="create" />
    </main>
  );
}
