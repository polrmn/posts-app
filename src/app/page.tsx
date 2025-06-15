import Title from "antd/es/typography/Title";
import { Button, Space } from "antd";
import { Post } from "@/types/post";
import { getPosts } from "@/lib/api";
import Link from "next/link";
import Paragraph from "antd/es/typography/Paragraph";
import styles from "./page.module.css";
import PostsList from "./components/PostsList";

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
          <PostsList posts={[...posts].slice(-3)} title="Latest posts" />
        ) : (
          <Paragraph type="secondary">No posts here 😢</Paragraph>
        )}
      </main>
    </div>
  );
};

export default Home;
