"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
interface Props {
  onUpload: (url: string) => void;
}
const ImageUpload = ({ onUpload }: Props) => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ------------------ AUTH ------------------ */
  const authenticator = async () => {
    const response = await fetch("/api/auth/imageKit");

    if (!response.ok) {
      throw new Error("Failed to authenticate");
    }

    const { signature, expire, token, publicKey } = await response.json();
    return { signature, expire, token, publicKey };
  };

  /* ------------------ UPLOAD ------------------ */
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }
    const abortController = new AbortController();

    setIsUploading(true);

    try {
      const { signature, expire, token, publicKey } = await authenticator();

      const response = await upload({
        file: selectedFile,
        fileName: selectedFile.name,
        signature,
        expire,
        token,
        publicKey,
        abortSignal: abortController.signal,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
      });

      console.log("Upload success:", response);

      setProgress(100);
      setTimeout(resetForm, 800);
      toast("Your image uploaded successfully");
      onUpload(response.url);
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted");
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error(error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error");
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error");
      } else {
        console.error(error);
      }
      setIsUploading(false);
    }
  };

  /* ------------------ RESET ------------------ */
  const resetForm = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setSelectedFile(null);
    setPreview(null);
    setProgress(0);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        hidden
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setSelectedFile(file);
          if (preview) {
            URL.revokeObjectURL(preview);
          }
          setPreview(URL.createObjectURL(file));
        }}
      />

      {/* Select Button */}
      {!selectedFile && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
        >
          Select Image
        </button>
      )}

      {/* File Name */}
      {selectedFile && (
        <p className="text-sm text-gray-300">Selected: {selectedFile.name}</p>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative w-48 h-48 rounded-md overflow-hidden border border-gray-600">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <button
            className="bg-red-700  pb-1 opacity-20 text-white font-light flex items-center justify-center text-center border w-5 h-5 border-red-400 hover:opacity-100 rounded-full absolute top-2 right-2 cursor-pointer"
            onClick={resetForm}
          >
            x
          </button>
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 disabled:opacity-50"
        >
          Upload Image
        </button>
      )}

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="w-full">
          <div className="flex justify-between mb-1 text-sm text-gray-300">
            <span>Uploading</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-500 h-3 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
