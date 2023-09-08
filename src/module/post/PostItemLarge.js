import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostThumbnail from "./PostThumbnail";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";

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
  const { data } = props;
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
  console.log(categories);

  // console.log(categories);
  if (!data) return;
  const { title, slug, desc, image, createAt } = data;

  return (
    <PostItemLargeStyles className="post-large">
      <PostThumbnail
        height="480px"
        url={
          image ||
          "https://jellywp.com/theme/disto/demo/wp-content/uploads/2018/11/melissa-walker-horn-1058236-unsplash-1920x982.jpg"
        }
      ></PostThumbnail>
      <div className="post-content">
        {categories.map((category) => (
          <PostCategory href={`/${category.slug}`}>
            {category.name}
          </PostCategory>
        ))}
        <PostTitle size="32px" color="white">
          {title}
        </PostTitle>
        <PostMeta color="white"></PostMeta>
      </div>
    </PostItemLargeStyles>
  );
};

export default PostItemLarge;
