import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import ImageUpload from "components/input/ImageUpload";
import { Label } from "components/label";
import Heading from "components/layout/Heading";
import { Textarea } from "components/textarea";
import PostCategory from "module/post/PostCategory";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { postStatus } from "utils/constants";

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
  const {
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: "",
    },
  });
  const watchStatus = watch("status");
  return (
    <AddNewPostPageStyles>
      <Heading>Add new post</Heading>
      <form>
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
            <ImageUpload name="image"></ImageUpload>
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
            <div>
              <PostCategory>Active</PostCategory>
              <PostCategory>Gaming</PostCategory>
              <PostCategory>Healthy</PostCategory>
              <PostCategory>Business</PostCategory>
            </div>
          </Field>
        </div>
      </form>
    </AddNewPostPageStyles>
  );
};

export default AddNewPostPage;
