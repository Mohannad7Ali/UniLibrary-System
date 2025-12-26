"use client";

import { Video, buildSrc } from "@imagekit/next";
import config from "@/lib/config";

interface Props {
  videoUrl: string; // مثال: /books/videos/trailer.mp4
}

const BookVideo = ({ videoUrl }: Props) => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-2xl">
      <Video
        urlEndpoint={config.env.imageKit.urlEndpoint}
        src={videoUrl} // نستخدم path بدلاً من src الكامل لسهولة التحويلات
        controls={true}
        className="w-full aspect-video"
        // 1. الأداء: تحميل كسول (Lazy Loading) مع صورة غلاف تلقائية
        preload="none"
        poster={buildSrc({
          urlEndpoint: config.env.imageKit.urlEndpoint,
          src: `${videoUrl}/ik-thumbnail.jpg`, // جلب أول إطار من الفيديو كصورة غلاف
        })}
        // 2. التحويلات: تصغير حجم الفيديو وتقليل الجودة قليلاً لتسريع التحميل
        transformation={[
          {
            width: "800", // عرض مناسب لمشغل الفيديو
            quality: 80,
          },
        ]}
      />
    </div>
  );
};

export default BookVideo;
