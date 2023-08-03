import PostItemLarge from "module/post/PostItemLarge";
import PostItemMini from "module/post/PostItemMini";
import React from "react";
import styled from "styled-components";

const PostsByCategoryStyles = styled.div`
  display: flex;
  column-gap: 24px;
  .post-large {
    flex: 1;
  }
  .list-post__right {
    display: flex;
    width: 30%;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const PostsByCategory = () => {
  return (
    <PostsByCategoryStyles>
      <PostItemLarge></PostItemLarge>
      <div className="list-post__right">
        <PostItemMini></PostItemMini>
        <PostItemMini></PostItemMini>
        <PostItemMini></PostItemMini>
        <PostItemMini></PostItemMini>
      </div>
    </PostsByCategoryStyles>
  );
};

export default PostsByCategory;
