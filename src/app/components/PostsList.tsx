"use client";

import { Post } from "@/types/post";
import { List } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import React from "react";

type ListVariant = "basic" | "advanced" | undefined;

const PostsList = ({
  posts,
  variant = "basic",
  title,
}: {
  posts: Post[];
  variant?: ListVariant;
  title?: string;
}) => {
  const renderBasicItem = (item: Post) => (
    <List.Item>
      <List.Item.Meta title={item.title} description={item.content} />
    </List.Item>
  );

  const renderAdvancedItem = (item: Post) => (
    <List.Item actions={[<Link href={`/post/${item.id}/edit`}>Edit</Link>]}>
      <List.Item.Meta
        title={item.title}
        description={<Paragraph>{item.content}</Paragraph>}
      />
      <span>{`comments: ${Math.round(Math.random() * 1000)}`}</span>
    </List.Item>
  );

  return (
    <div>
      {title && <Title level={5}>{title}</Title>}
      <List
        style={{ width: "100%" }}
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={variant === "basic" ? renderBasicItem : renderAdvancedItem}
      />
    </div>
  );
};

export default PostsList;
