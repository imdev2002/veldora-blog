import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PostCategory from "./components/PostCategory";
import PostTitle from "./components/PostTitle";
import PostMeta from "./components/PostMeta";
import PostDescription from "./components/PostDescription";
import PostThumbnail from "./components/PostThumbnail";

const PostItemStyles = styled.div`
  width: 340px;
  .post-content {
    font-size: 14px;
  }
`;

const PostItem = () => {
  return (
    <PostItemStyles>
      <PostThumbnail url="https://jellywp.com/theme/disto/demo/wp-content/uploads/2019/03/daniel-korpai-1296140-unsplash-780x450.jpg">
        <PostCategory absolute>Science</PostCategory>
      </PostThumbnail>
      <div className="post-content">
        <PostTitle>This is a great photo and nice for shooting</PostTitle>
        <PostMeta></PostMeta>
        <PostDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          cumque sit odit non, est fuga corporis iste eos ipsum repudiandae hic
          officiis eveniet tempore optio temporibus voluptatum tempora totam
          ullam.
        </PostDescription>
      </div>
    </PostItemStyles>
  );
};

export default PostItem;
