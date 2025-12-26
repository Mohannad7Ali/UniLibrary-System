const Loading = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative h-20 w-20">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-700" />

          {/* Animated ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400" />

          {/* Center dot */}
          <div className="absolute inset-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 animate-pulse" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-white">Loading</h2>
          <p className="mt-1 text-sm text-gray-400">Please wait a moment</p>
        </div>
      </div>
    </main>
  );
};

export default Loading;
