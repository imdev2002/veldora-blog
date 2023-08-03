import { IconClock } from "components/icons";
import React from "react";
import styled from "styled-components";

const PostMetaStyles = styled.div`
  font-size: 12px;
  display: flex;
  column-gap: 18px;
  margin: 8px 0;
  color: ${(props) => props.color};
  .post-auth,
  .post-date {
    display: flex;
    column-gap: 8px;
    align-items: center;
    &-avt {
      width: 25px;
      height: 25px;
      object-fit: cover;
      border-radius: 100rem;
    }
    &-name {
      font-weight: 500;
    }
  }
`;

const PostMeta = ({ color = "black", auth, date = "Dec 24, 2016" }) => {
  return (
    <PostMetaStyles className="post-meta" color={color}>
      <div className="post-auth">
        <img
          className="post-auth-avt"
          src="https://jellywp.com/theme/disto/demo/wp-content/uploads/2016/12/felipe-sagn-1434616-unsplash-780x450.jpg"
          alt=""
        />
        <span className="post-auth-name">im_dev2002</span>
      </div>

      <div className="post-date">
        <span className="post-date-icon">
          <IconClock size={18} color={color}></IconClock>
        </span>
        {date}
      </div>
    </PostMetaStyles>
  );
};

export default PostMeta;
