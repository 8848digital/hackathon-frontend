'use client';

import Navbar from "@/components/Navbar";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./Error";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedAuth from "@/components/ProtectedAuth";

const ClientLayout = ({ children }: any) => {

  return (
    <AuthProvider>
       {/* <ProtectedAuth> */}
          <ErrorBoundary errorComponent={Error}>
            <div>
              <Navbar />
              <main className="">{children}</main>
            </div>
          </ErrorBoundary>
       {/* </ProtectedAuth> */}
    </AuthProvider>
  );
};

export default ClientLayout;
