import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import apiClient from "./axios";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Laravel Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password", placeholder: "••••••••" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        try {
          // Dapatkan CSRF token dari Sanctum
          await apiClient.get("/sanctum/csrf-cookie");

          const res = await apiClient.post("/api/login", {
            email,
            password,
          });

          const data = res.data;

          if (data.status && data.user) {
            return {
              ...data.user,
              token: data.token,
              expires_at: data.expires_at, // Tambahkan jika tersedia
            };
          } else {
            throw new Error(data.message || "Login gagal");
          }
        } catch (error: any) {
          const message =
            error.response?.data?.message || "Terjadi kesalahan pada server";
          console.error("Login Error:", message);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.is_admin = user.is_admin;
        token.expires_at = user.expires_at; // Simpan expired token jika ada
      }

      return token;
    },
    async session({ session, token }) {
      // Pastikan `accessToken` bertipe string atau null
      session.accessToken = (token.accessToken as string) || null;
      session.user = {
        ...session.user,
        id: token.id as string,
        is_admin: token.is_admin as boolean,
        expires_at: token.expires_at as string | null,
      };
      return session;
    },
  },

  debug: process.env.NODE_ENV !== "production",
};
