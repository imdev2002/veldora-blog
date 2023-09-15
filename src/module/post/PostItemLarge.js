import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostThumbnail from "./PostThumbnail";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { v4 } from "uuid";

const PostItemLargeStyles = styled.div`
  position: relative;
  width: 760px;
  .post-content {
    position: absolute;
    bottom: 0;
    margin: 12px;
    z-index: 2;
    .post-title a {
      color: white;
    }
  }
`;

const PostItemLarge = (props) => {
  const [categories, setCategories] = useState([]);
  const { data, ...rest } = props;
  useEffect(() => {
    const colRef = collection(db, "categories");

    async function fetchCategory() {
      const querySnapshot = await getDocs(colRef);
      const result = [];
      data?.categories.forEach((category) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === category) result.push(doc.data());
        });
      });
      setCategories(result);
    }

    fetchCategory();
  }, []);

  if (!data) return;
  const { title, slug, desc, image, createdAt, user } = data;
  const date = new Date(createdAt.seconds * 1000).toLocaleDateString("vi-VI", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <PostItemLargeStyles className="post-large" {...rest}>
      <PostThumbnail
        height="480px"
        url={
          image ||
          "https://jellywp.com/theme/disto/demo/wp-content/uploads/2018/11/melissa-walker-horn-1058236-unsplash-1920x982.jpg"
        }
      ></PostThumbnail>
      <div className="post-content">
        {categories.map((category) => (
          <PostCategory key={v4()} href={`/${category.slug}`}>
            {category.name}
          </PostCategory>
        ))}
        <PostTitle size="32px" color="white">
          {title}
        </PostTitle>
        <PostMeta color="white" date={date} auth={user}></PostMeta>
      </div>
    </PostItemLargeStyles>
  );
};

export default PostItemLarge;
