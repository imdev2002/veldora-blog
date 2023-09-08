import React, { Fragment } from "react";
import { signOut } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import Heading from "components/layout/Heading";
import PostItem from "module/post/PostItem";
import Layout from "components/layout/Layout";
import PostsByCategory from "module/home/PostsByCategory";
import HomeSection from "module/home/HomeSection";
import HomeFeature from "module/home/HomeFeature";

const HomePage = () => {
  return (
    <Layout>
      <HomeFeature></HomeFeature>
      <HomeSection>
        <Heading>Random Posts</Heading>
        <PostItem></PostItem>
      </HomeSection>
      <div
        style={{
          width: "100%",
          backgroundColor: "#fef7e3",
        }}
      >
        <HomeSection>
          <Heading>Công nghệ</Heading>
          <PostsByCategory></PostsByCategory>
        </HomeSection>
      </div>
      <HomeSection>
        <Heading>Recent Posts</Heading>
        <PostItem></PostItem>
      </HomeSection>
    </Layout>
  );
};

export default HomePage;
