import React from "react";
import styled from "styled-components";
import PostThumbnail from "./PostThumbnail";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";

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

const PostItemLarge = () => {
  return (
    <PostItemLargeStyles className="post-large">
      <PostThumbnail
        height="480px"
        url="https://jellywp.com/theme/disto/demo/wp-content/uploads/2018/11/melissa-walker-horn-1058236-unsplash-1920x982.jpg"
      ></PostThumbnail>
      <div className="post-content">
        <PostCategory>Active</PostCategory>
        <PostTitle size="32px" color="white">
          Beautiful flying bikes with simple style but look good
        </PostTitle>
        <PostMeta color="white"></PostMeta>
      </div>
    </PostItemLargeStyles>
  );
};

export default PostItemLarge;
