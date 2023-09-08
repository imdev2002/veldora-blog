import { Radio, Toggle } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import ImageUpload from "components/input/ImageUpload";
import { Label } from "components/label";
import Heading from "components/layout/Heading";
// import TagPicker from "components/tagpicker/TagPicker";
import { Textarea } from "components/textarea";
// import PostCategory from "module/post/PostCategory";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { postStatus } from "utils/constants";
import Select from "react-select";
import { Button } from "components/button";
import slugify from "slugify";
import useFirebaseImage from "hooks/useFireBaseImage";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { useAuthStore } from "store";
import { toast } from "react-toastify";

const AddNewPostPageStyles = styled.div`
  .field-format {
    display: flex;
    justify-content: space-between;
    width: 100%;
    & > * {
      width: 46%;
    }
  }
`;

const AddNewPostPage = () => {
  const { user } = useAuthStore((state) => state);
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categories: [],
      featured: false,
      user: {},
    },
  });
  const [optionValues, setOptionValues] = useState([]);
  const [categories, setCategories] = useState([]);
  const watchStatus = watch("status");
  const watchFeatured = watch("featured");
  const {
    image,
    progress,
    handleSelectImg,
    handleDeleteImg,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues);
  useEffect(() => {
    async function getUserInfo() {
      if (!user) return;
      const colRef = collection(db, "users");
      const q = query(colRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const uploadPostHandler = async (values) => {
    console.log(
      "🚀 ~ file: AddNewPostPage.js:83 ~ uploadPostHandler ~ values:",
      values
    );
    const categoriesSelected = optionValues.map((category) => category.value);
    console.log({ ...values, categories: categoriesSelected });
    const colRef = collection(db, "posts");
    await addDoc(colRef, {
      ...values,
      image,
      slug: slugify(values.slug || values.title, { lower: true }),
      status: Number(values.status),
      categories: categoriesSelected,
      createdAt: serverTimestamp(),
    });
    toast.success("Create new post successfully!");
    reset({
      title: "",
      status: 2,
      categories: [],
      featured: false,
    });
    handleResetUpload();
    setOptionValues([]);
  };

  useEffect(() => {
    async function getCategories() {
      const categoriesRef = collection(db, "categories");
      const q = query(categoriesRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          value: doc.id,
          label: doc.data().name,
        });
      });
      setCategories(result);
    }
    getCategories();
  }, []);

  console.log(categories);
  return (
    <AddNewPostPageStyles>
      <Heading>Add new post</Heading>
      <form autoComplete="off" onSubmit={handleSubmit(uploadPostHandler)}>
        <div className="field-format">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input name="title" control={control} placeholder="Title"></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input name="slug" control={control}></Input>
          </Field>
        </div>
        <div className="field-format">
          <Field>
            <Label htmlFor="desc">Short description</Label>
            <Textarea
              name="desc"
              control={control}
              placeholder="Short Description..."
            ></Textarea>
          </Field>
          <Field>
            <Label>Thumbnail</Label>
            <ImageUpload
              name="image"
              progress={progress}
              image={image}
              onChange={handleSelectImg}
              handleDeleteImage={handleDeleteImg}
            ></ImageUpload>
          </Field>
        </div>
        <div className="field-format">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Rejected
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Category</Label>
            <Select
              control={control}
              isMulti
              name="categories"
              options={categories}
              className="basic-multi-select"
              placeholder="Select categories..."
              classNamePrefix="select"
              onChange={setOptionValues}
              value={optionValues}
            />
          </Field>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            margin: "12px 0 24px",
          }}
        >
          <Label>Featured Post:</Label>
          <Toggle
            on={watchFeatured === true}
            onClick={() => setValue("featured", !watchFeatured)}
          ></Toggle>
        </div>
        <Button type="submit">Create Post</Button>
      </form>
    </AddNewPostPageStyles>
  );
};

export default AddNewPostPage;
