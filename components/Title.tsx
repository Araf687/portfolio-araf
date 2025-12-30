"use client";

interface TitleTextProps {
  children: string;
  className?: string;
  direction?: "row" | "column";
}

export default function TitleText({
  children,
  className = "text-2xl sm:text-3xl lg:text-[100px]",
  direction = "column",
}: TitleTextProps) {
  if (!children) return null;

  const words = children.trim().split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");

  const isColumn = direction === "column";

  return (
    <div
      className={`
        font-bold leading-none flex
        flex-row items-center justify-center
        ${isColumn ? "lg:flex-col lg:items-start lg:justify-start" : "lg:flex-row lg:items-start lg:justify-start"}
        ${className}
      `}
    >
      <span className="text-white">{firstWord}</span>

      {restWords && (
        <span
          className={`
            text-gray-600 ml-2
            ${isColumn ? "lg:ml-0 lg:mt-0" : "lg:ml-6 lg:mt-0"}
          `}
        >
          {restWords}
        </span>
      )}
    </div>
  );
}
