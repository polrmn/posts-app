"use client";

import React, { useEffect } from "react";
import Title from "antd/es/typography/Title";
import { useAppSelector } from "@/store/hooks";
import { getPosts } from "@/store/post/selectors";
import PostsList from "../components/PostsList";
import styles from "./Posts.module.css";
import { useDispatch } from "react-redux";
import Paragraph from "antd/es/typography/Paragraph";
import { fetchPostsPending } from "@/store/post/slice";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useAppSelector(getPosts);

  console.log(posts);

  useEffect(() => {
    dispatch(fetchPostsPending());
  }, []);

  return (
    <main className={styles.main}>
      <Title level={2}>Posts</Title>
      {posts.length > 0 ? (
        <PostsList posts={posts} variant="advanced"/>
      ) : (
        <Paragraph type="secondary">No posts here 😢</Paragraph>
      )}
    </main>
  );
};

export default Posts;
