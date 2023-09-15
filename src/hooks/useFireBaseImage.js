import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useState } from "react";

export default function useFirebaseImage(setValue, getValues) {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  if (!setValue || !getValues) return;
  const hanldeUploadImg = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressTemp =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressTemp);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("nothing");
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };
  const handleSelectImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    hanldeUploadImg(file);
  };
  const handleDeleteImg = (file) => {
    const storage = getStorage();

    const imageRef = ref(storage, "images/" + getValues("image_name"));

    deleteObject(imageRef)
      .then(() => {
        console.log("File deleted successfully");
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred!");
      });
  };
  const handleResetUpload = () => {
    setImage("");
    setProgress(0);
  };
  return {
    image,
    progress,
    handleSelectImg,
    handleDeleteImg,
    handleResetUpload,
  };
}
