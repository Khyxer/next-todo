import { X } from "lucide-react";

export default function ModalLayout({
  children,
  onClose,
  titleModal,
  className,
}: {
  children: React.ReactNode;
  onClose: () => void;
  titleModal: string;
  className?: string;
}) {
  return (
    <div
      className="fixed z-50 top-0 left-0 w-full h-screen bg-neutral-950/70 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={`flex flex-col gap-4 max-w-sm w-full px-5 py-4 rounded-xl bg-white border border-gray-300 dark:bg-neutral-900 dark:border-zinc-700 relative ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-medium">{titleModal}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 relative p-1 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer group"
            aria-label="Cerrar modal"
          >
            <X />
            <div className="absolute inset-0 w-full h-full bg-gray-600/20 rounded-full scale-0 group-hover:scale-100 transition-transform" />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}
