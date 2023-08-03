import { Input } from "components/input";
import { Label } from "components/label";
import React from "react";
import { useForm } from "react-hook-form";
import { Field } from "components/field";
import InputPassword from "components/input/InputPassword";
import { Button } from "components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import LayoutAuthentication from "layout/LayoutAuthentication";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Your password must be least 8 characters or greater")
    .required("Please enter your password"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    console.log(values);
    // return new Promise((resolve) => setTimeout(() => resolve(), 3000));
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, { displayName: values.fullname });
    toast.success("Registered successfully!!");
    const colRef = collection(db, "users");
    await addDoc(colRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    });
    navigate("/");
  };
  return (
    <LayoutAuthentication>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleSignUp)}
        className="form"
      >
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            type="text"
            name="fullname"
            className="input"
            placeholder="Enter your fullname..."
            control={control}
            error={errors?.fullname?.message}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            name="email"
            className="input"
            placeholder="Enter your email address..."
            control={control}
            error={errors?.email?.message}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPassword
            type="password"
            name="password"
            className="input"
            placeholder="Enter your password..."
            control={control}
            error={errors?.password?.message}
          ></InputPassword>
        </Field>
        <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          Sign Up
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default RegisterPage;
