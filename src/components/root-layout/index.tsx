import { Toaster } from "sonner";
import { Header } from "../header";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div className="mx-auto flex flex-col max-w-7xl items-center justify-between lg:px-8">
      <Header />
      <div className="w-full mt-6">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}