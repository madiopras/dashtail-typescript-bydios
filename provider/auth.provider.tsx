"use client";

import { SessionProvider } from "next-auth/react";

type AuthProviderProps = {
  children: React.ReactNode;
  //session?: any; // Optional: Jika Anda ingin menginisialisasi sesi dari server
};

const AuthProvider = ({ children}: AuthProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;

