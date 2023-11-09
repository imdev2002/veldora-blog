import React from "react";
import styled, { css } from "styled-components";
import PostThumbnail from "./components/PostThumbnail";
import PostTitle from "./components/PostTitle";
import PostCategory from "./components/PostCategory";
import PostMeta from "./components/PostMeta";

const PostMiniItemStyles = styled.div`
  display: flex;
  ${(props) =>
    props.reverse &&
    css`
      flex-direction: row-reverse;
    `};
  column-gap: 12px;
  height: 100px;
  .post-thumb {
    width: 100px;
    height: 100px;
    a {
      display: block;
      width: 100px;
    }
  }
  .post-auth {
    display: none;
  }
`;

const PostItemMini = ({ isReverse = false }) => {
  return (
    <PostMiniItemStyles reverse={isReverse}>
      <PostThumbnail url="https://jellywp.com/theme/disto/demo/wp-content/uploads/2016/12/bartosz-wanot-133401-unsplash-120x120.jpg"></PostThumbnail>
      <div className="post-content">
        <PostCategory>Gaming</PostCategory>
        <PostTitle size="16px">
          You can make your art with canyon color
        </PostTitle>
        <PostMeta></PostMeta>
      </div>
    </PostMiniItemStyles>
  );
};

export default PostItemMini;
