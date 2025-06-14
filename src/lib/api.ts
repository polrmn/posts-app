import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
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
