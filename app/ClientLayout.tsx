'use client';

import Navbar from "@/components/Navbar";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./Error";
import { AuthProvider } from "@/contexts/AuthContext";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <AuthProvider>
      <ErrorBoundary errorComponent={Error}>
        <div>
          <Navbar />
          <main className="">{children}</main>
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
};

export default ClientLayout;
