import { useWindowSize } from "@uidotdev/usehooks";
import { db } from "config/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import PostItemLarge from "module/post/PostItemLarge";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HomeFeatureStyles = styled.div`
  @media only screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2px;

  .post-large {
    width: unset;
    .post-thumb {
      height: 570px;
    }
  }
`;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  const { width } = useWindowSize();

  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("status", "==", 1),
      where("featured", "==", true),
      limit(4)
    );
    onSnapshot(q, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(result);
    });
  }, [width]);
  if (posts.length <= 0 || width <= 640) return;
  console.log(posts);
  return (
    <HomeFeatureStyles>
      {(width <= 1024 ? posts.slice(0, 2) : posts).map((post) => (
        <PostItemLarge key={post.id} data={post}></PostItemLarge>
      ))}
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
