'use client';

import Navbar from "@/components/Navbar";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./Error";

const ClientLayout = ({ children }: any) => {

  return (
    <ErrorBoundary errorComponent={Error}>
        <div >
        <Navbar />
        <main>{children}</main>
        </div>
    </ErrorBoundary>
  );
};

export default ClientLayout;
