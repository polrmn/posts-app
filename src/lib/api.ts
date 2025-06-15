import { db } from "./firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Post } from "@/types/post";
import { PostInput } from "@/validation/postSchema";

export const getPosts = async (): Promise<Post[]> => {
  const snap = await getDocs(collection(db, "posts"));
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Post));
};

export const createPost = async (post: PostInput) => {
  const docRef = await addDoc(collection(db, "posts"), post);
  return { id: docRef.id, ...post };
};

export const updatePost = async (post: Post) => {
  const docRef = doc(db, "posts", post.id);
  const { id, ...data } = post;
  await updateDoc(docRef, data);
  return post;
};

export const deletePost = async (id: string) => {
  const docRef = doc(db, "posts", id);
  await deleteDoc(docRef);
};
