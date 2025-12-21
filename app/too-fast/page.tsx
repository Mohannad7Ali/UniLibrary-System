const Page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center  from-indigo-900 via-purple-900 to-indigo-800 px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 flex flex-col items-center">
        <h1 className="font-bebas-neue text-5xl md:text-6xl font-bold text-light-100 drop-shadow-lg tracking-wide mb-4">
          Whoa, Slow Down There, Speedy!
        </h1>
        <p className="mt-3 max-w-xl text-center text-light-400 text-lg md:text-xl leading-relaxed">
          Looks like you&apos;ve been a little too eager. We&apos;ve put a
          temporary pause on your excitement.{" "}
          <span className="text-yellow-300 text-2xl">🚦</span> Chill for a bit,
          and try again shortly.
        </p>
      </div>
    </main>
  );
};
export default Page;
