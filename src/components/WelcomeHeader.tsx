export default function WelcomeHeader() {
  return (
    <div className="mb-6 px-4 text-center sm:mb-10">
      <div className="mb-4 animate-pulse text-5xl sm:mb-6 sm:text-6xl md:text-8xl">
        ☀️
      </div>
      <h1 className="mb-3 bg-linear-to-r from-white via-blue-200 to-white bg-clip-text text-3xl font-extrabold tracking-tight text-transparent drop-shadow-lg sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl dark:from-indigo-300 dark:via-blue-300 dark:to-white">
        The Weather Channel
      </h1>
      <p className="text-base text-white/95 sm:text-lg md:text-xl dark:text-gray-300">
        Precise forecasts at your fingertips
      </p>
    </div>
  );
}
