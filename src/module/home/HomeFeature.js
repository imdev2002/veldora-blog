import PostItemLarge from "module/post/PostItemLarge";
import React from "react";
import styled from "styled-components";

const HomeFeatureStyles = styled.div`
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
  return (
    <HomeFeatureStyles>
      <PostItemLarge></PostItemLarge>
      <PostItemLarge></PostItemLarge>
      <PostItemLarge></PostItemLarge>
      <PostItemLarge></PostItemLarge>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
