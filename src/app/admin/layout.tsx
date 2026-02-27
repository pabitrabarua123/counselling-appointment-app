import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import AppSidebar from "@/components/Admin/AppSidebar";
import AppHeader from "@/components/Admin/AppHeader";
import Backdrop from "@/components/Admin/Backdrop";
import { SidebarProvider } from "@/components/providers/SidebarContext";
import { ThemeProvider } from "@/components/providers/ThemeContext";

import styles from "./admin.module.css";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent("/admin")}`
    );
  }

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className={`min-h-screen xl:flex ${styles.adminBody}`}>
          <div>
            <AppSidebar />
            <Backdrop />
          </div>

          <div className="flex-1 transition-all duration-300 ease-in-out lg:ml-[290px]">
            <AppHeader />
            <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}