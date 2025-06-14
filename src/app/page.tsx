import Title from "antd/es/typography/Title";
import { Button, Card, Space } from "antd";
import { Post } from "@/types/post";
import { getPosts } from "@/lib/api";
import Link from "next/link";
import Paragraph from "antd/es/typography/Paragraph";
import styles from "./page.module.css";

const Home = async () => {
  const posts: Post[] = await getPosts();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Title level={1}>Discover our posts</Title>

        <Space size="middle" className="mb-6">
          <Link href="/posts">
            <Button type="primary">All posts</Button>
          </Link>
          <Link href="/create">
            <Button>Create post</Button>
          </Link>
        </Space>

        {posts.length > 0 ? (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {posts.map((post) => (
              <Card key={post.id} title={post.title}>
                <Paragraph>{post.content}</Paragraph>
              </Card>
            ))}
          </Space>
        ) : (
          <Paragraph type="secondary">No posts here 😢</Paragraph>
        )}
      </main>
    </div>
  );
};

export default Home;
