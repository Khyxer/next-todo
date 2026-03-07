"use client";

export default function ExpandableButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center justify-center h-8 px-2
        rounded-lg border border-gray-200 dark:border-zinc-700
        text-gray-500 dark:text-gray-400
        hover:bg-gray-100 dark:hover:bg-zinc-800
        transition-colors cursor-pointer"
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-all duration-200">
        <div className="overflow-hidden">
          <span className="pl-1.5 text-sm whitespace-nowrap">{label}</span>
        </div>
      </div>
    </button>
  );
}
