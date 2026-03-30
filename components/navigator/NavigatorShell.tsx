"use client";

import { AuthModal } from "./AuthModal";
import { CareerProvider, useCareer } from "./CareerContext";
import { LoadingOverlay } from "./LoadingOverlay";
import { NavigatorNav } from "./NavigatorNav";

function NavigatorChrome({ children }: { children: React.ReactNode }) {
  const { toast } = useCareer();

  return (
    <>
      <div data-navigator className="min-h-screen">
        <NavigatorNav />
        {children}
        <AuthModal />
      </div>
      <div className={`toast${toast ? " show" : ""}`} role="status">
        {toast ?? ""}
      </div>
      <LoadingOverlay />
    </>
  );
}

export function NavigatorShell({ children }: { children: React.ReactNode }) {
  return (
    <CareerProvider>
      <NavigatorChrome>{children}</NavigatorChrome>
    </CareerProvider>
  );
}
