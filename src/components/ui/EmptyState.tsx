import type { ReactNode } from "react";

type EmptyStateProps = {
  message?: string;
  /** Acción opcional (por ejemplo, un enlace). */
  children?: ReactNode;
};

export default function EmptyState({
  message = "No se encontraron resultados",
  children,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-line bg-white px-6 py-16 text-center"
    >
      <p className="font-display text-2xl text-petrol">{message}</p>
      {children}
    </div>
  );
}
