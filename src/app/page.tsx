"use client";
import { useState, useEffect } from "react";
import { storage } from "@/libs/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Home = () => {
  const [formFile, setFormFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState<string>("");
  const [progress, setProgress] = useState<number | any>(0);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (
      (file && file.type === "image/svg+xml") ||
      file.type === "image/png" ||
      file.type === "image/jpeg"
    ) {
      setFormFile(file);
    } else {
      alert("Please upload a valid image file (SVG, PNG or JPG)");
    }
  };

  useEffect(() => {
    if (formFile) {
      const storageRef = ref(storage, `images/${formFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, formFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress.toFixed(0));
        },
        (error) => {
          setError(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProgress(0);
            setDownloadURL(downloadURL);
          });
        }
      );
    }
  }, [formFile]);

  return (
    <main className="flex h-5/6 w-4/6 items-center justify-center rounded-md border border-white border-opacity-50">
      {progress > 0 ? (
        <div className="flex h-full w-3/6 flex-col items-center justify-center">
          <div className="mb-1 flex w-full justify-between">
            <span className="text-sm font-medium text-blue-700 dark:text-white">
              {formFile?.name}
            </span>
            <span className="text-sm font-medium text-blue-700 dark:text-white">
              {progress}%
            </span>
          </div>
          <div className="h-3.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-3.5 rounded-full bg-blue-600"
              style={{ width: progress + "%" }}
            ></div>
          </div>
        </div>
      ) : downloadURL ? (
        <div className="flex h-full w-3/6 flex-col items-center justify-center">
          <img
            src={downloadURL}
            alt="Uploaded image"
            className="h-64 w-64 rounded-md object-cover"
          />
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex h-64 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-transparent text-white transition duration-150 ease-in-out hover:bg-white/30 "
        >
          {" "}
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FileUploadIcon />
            <p className="mb-2 text-sm">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-white/80">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
      {error && (
        <div className="flex h-full w-3/6 flex-col items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </main>
  );
};

export default Home;

const FileUploadIcon = () => (
  <svg
    aria-hidden="true"
    className="mb-3 h-10 w-10"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    ></path>
  </svg>
);
