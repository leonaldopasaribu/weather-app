interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded-xl bg-red-500/10 p-3 text-sm text-red-700 sm:p-4 sm:text-base dark:bg-red-900/30 dark:text-red-400">
      {message}
    </div>
  );
}
