export default function LoadingSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-6 sm:gap-8 lg:flex-row">
      <div className="w-full lg:w-2/5">
        <div className="rounded-2xl bg-linear-to-br from-gray-300 to-gray-400 p-6 shadow-2xl sm:rounded-4xl sm:p-8 md:p-10 dark:from-gray-700 dark:to-gray-800">
          <div className="mb-4 text-center sm:mb-6">
            <div className="mx-auto mb-3 h-8 w-3/4 rounded-lg bg-white/30 sm:h-10 dark:bg-gray-600/30"></div>
            <div className="mx-auto h-5 w-1/2 rounded-lg bg-white/20 sm:h-6 dark:bg-gray-600/20"></div>
          </div>

          <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:mb-8 sm:flex-row sm:gap-6">
            <div className="h-[100px] w-[100px] rounded-full bg-white/30 sm:h-[120px] sm:w-[120px] dark:bg-gray-600/30"></div>
            <div className="h-24 w-40 rounded-lg bg-white/30 sm:h-28 dark:bg-gray-600/30"></div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-2xl bg-white/20 p-4 backdrop-blur-lg sm:gap-4 sm:p-5 md:gap-6 md:p-6 dark:bg-gray-600/20">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-2 h-4 w-20 rounded bg-white/30 dark:bg-gray-500/30"></div>
                <div className="mx-auto h-6 w-16 rounded bg-white/40 dark:bg-gray-500/40"></div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-around rounded-2xl bg-white/20 p-4 backdrop-blur-lg sm:mt-6 sm:p-5 dark:bg-gray-600/20">
            <div className="text-center">
              <div className="mx-auto mb-2 h-4 w-16 rounded bg-white/30 dark:bg-gray-500/30"></div>
              <div className="mx-auto h-6 w-12 rounded bg-white/40 dark:bg-gray-500/40"></div>
            </div>
            <div className="h-full w-px bg-white/30"></div>
            <div className="text-center">
              <div className="mx-auto mb-2 h-4 w-16 rounded bg-white/30 dark:bg-gray-500/30"></div>
              <div className="mx-auto h-6 w-12 rounded bg-white/40 dark:bg-gray-500/40"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-3/5">
        <div className="rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur-md sm:rounded-4xl sm:p-6 md:p-8 dark:bg-gray-900/95">
          <div className="mb-4 h-8 w-3/4 rounded-lg bg-gray-300 sm:mb-6 sm:h-10 dark:bg-gray-700"></div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="flex flex-col rounded-xl bg-linear-to-br from-gray-200 to-gray-300 p-4 shadow-lg sm:p-5 dark:from-gray-800 dark:to-gray-700"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="mb-2 h-5 w-20 rounded bg-gray-400 sm:h-6 dark:bg-gray-600"></div>
                    <div className="h-3 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                  <div className="h-[45px] w-[45px] rounded-full bg-gray-400 sm:h-[50px] sm:w-[50px] dark:bg-gray-600"></div>
                </div>

                <div className="mb-3 flex items-center justify-between border-b border-gray-400 pb-3 dark:border-gray-600">
                  <div className="text-center">
                    <div className="mx-auto mb-2 h-3 w-8 rounded bg-gray-400 dark:bg-gray-600"></div>
                    <div className="mx-auto h-7 w-12 rounded bg-gray-400 dark:bg-gray-600"></div>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-2 h-3 w-8 rounded bg-gray-400 dark:bg-gray-600"></div>
                    <div className="mx-auto h-7 w-12 rounded bg-gray-400 dark:bg-gray-600"></div>
                  </div>
                </div>

                <div className="mx-auto mb-3 h-4 w-32 rounded bg-gray-400 dark:bg-gray-600"></div>

                <div className="flex justify-around pt-2">
                  <div className="text-center">
                    <div className="mx-auto mb-1 h-4 w-6 rounded bg-gray-400 dark:bg-gray-600"></div>
                    <div className="mx-auto h-3 w-10 rounded bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-1 h-4 w-6 rounded bg-gray-400 dark:bg-gray-600"></div>
                    <div className="mx-auto h-3 w-10 rounded bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
