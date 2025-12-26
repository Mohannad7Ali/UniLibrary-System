"use client";

import { upload, Video, buildSrc, Image as IkImage } from "@imagekit/next";
import NextImage from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Loader2, UploadCloud, X } from "lucide-react";
import config from "@/lib/config";

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onUpload: (url: string) => void;
  value?: string; // default value (edit mode)
}

const IK_URL_ENDPOINT = config.env.imageKit.urlEndpoint;

const FileUpload = ({
  onUpload,
  folder,
  variant,
  accept,
  type,
  placeholder,
  value,
}: Props) => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // ✅ initial value without useEffect
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(
    value ?? null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* -------------------- STYLES -------------------- */
  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-400 text-light-100 hover:bg-dark-500"
        : "bg-primary-admin text-white hover:bg-primary-admin/90",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-200" : "text-dark-400",
    progressBar: variant === "dark" ? "bg-blue-600" : "bg-primary-admin",
  };

  /* -------------------- VALIDATION -------------------- */
  const onValidate = (file: File) => {
    const allowedTypes =
      type === "image"
        ? ["image/jpeg", "image/png", "image/webp"]
        : ["video/mp4", "video/webm"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type");
      return false;
    }

    if (type === "image" && file.size > 20 * 1024 * 1024) {
      toast.error("Max image size is 20MB");
      return false;
    }

    if (type === "video" && file.size > 50 * 1024 * 1024) {
      toast.error("Max video size is 50MB");
      return false;
    }

    return true;
  };

  /* -------------------- AUTH -------------------- */
  const authenticator = async () => {
    const res = await fetch("/api/imageKit");
    if (!res.ok) throw new Error("Authentication failed");
    return res.json();
  };

  /* -------------------- UPLOAD -------------------- */
  const handleUpload = async () => {
    if (!selectedFile) return;
    if (!onValidate(selectedFile)) return;

    setIsUploading(true);
    setProgress(0);

    try {
      const authData = await authenticator();

      const res = await upload({
        file: selectedFile,
        fileName: selectedFile.name,
        folder,
        useUniqueFileName: true,
        ...authData,
        onProgress: (e) => setProgress((e.loaded / e.total) * 100),
      });

      setUploadedFileUrl(res.filePath);
      onUpload(res.filePath);
      setProgress(100);

      toast.success(
        `${type === "image" ? "Image" : "Video"} uploaded successfully`
      );
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
      setProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  /* -------------------- RESET -------------------- */
  const resetForm = () => {
    if (preview) URL.revokeObjectURL(preview);

    setSelectedFile(null);
    setPreview(null);
    setUploadedFileUrl(null);
    setProgress(0);
    setIsUploading(false);
    onUpload("");

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full space-y-4">
      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept={accept}
        disabled={isUploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setSelectedFile(file);
          setPreview(URL.createObjectURL(file));
        }}
      />

      {/* Select */}
      {!selectedFile && !uploadedFileUrl && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center w-full min-h-[120px] gap-2 rounded-xl border-2 border-dashed transition"
        >
          <UploadCloud className={`size-8 ${styles.placeholder}`} />
          <p className={`text-sm font-medium ${styles.placeholder}`}>
            {placeholder}
          </p>
        </button>
      )}

      {/* Preview */}
      {(selectedFile || uploadedFileUrl) && (
        <div className="space-y-4">
          <div className="relative aspect-video max-w-[420px] w-full rounded-xl overflow-hidden border">
            {isUploading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                <Loader2 className="size-8 text-white animate-spin" />
              </div>
            )}

            {!uploadedFileUrl &&
              preview &&
              (type === "image" ? (
                <NextImage
                  src={preview}
                  alt="preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <video src={preview} controls className="w-full h-full" />
              ))}

            {uploadedFileUrl &&
              (type === "image" ? (
                <IkImage
                  src={uploadedFileUrl}
                  alt="uploaded"
                  fill
                  className="object-cover"
                />
              ) : (
                <video
                  src={`${IK_URL_ENDPOINT}${uploadedFileUrl}`}
                  controls
                  className="w-full h-full"
                  poster={buildSrc({
                    urlEndpoint: IK_URL_ENDPOINT,
                    src: `${uploadedFileUrl}/ik-thumbnail.jpg`,
                  })}
                />
              ))}
            {!uploadedFileUrl && (
              <button
                onClick={resetForm}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {!uploadedFileUrl && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`px-6 py-2 rounded-lg font-bold text-sm ${styles.button}`}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          )}
        </div>
      )}

      {/* Progress */}
      {progress > 0 && progress < 100 && (
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${styles.progressBar}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
