import { ReactNode } from "react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { ToastProvider } from "@/providers/ToastProvider";

export const metadata = {
  robots: { index: false, follow: false },
  title: { template: "%s | Admin | Savoria", default: "Admin | Savoria" },
};

interface AdminRootLayoutProps {
  children: ReactNode;
}

export default function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return (
    <ToastProvider>
      <AdminLayout>{children}</AdminLayout>
    </ToastProvider>
  );
}
