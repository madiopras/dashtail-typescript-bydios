// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string; // Tambahkan jika backend mengembalikan ID user
    token: string; // Access token dari backend Laravel
    is_admin: boolean; // Status admin dari user
    expires_at: string; // Expired date token (format ISO string)
  }

  interface Session extends DefaultSession {
    accessToken: string | null; // Access token dari Laravel disimpan di sesi
    user: {
      id: string | null; // ID user
      name: string | null; // Nama user (opsional)
      email: string | null; // Email user (opsional)
      is_admin: boolean | null; // Status admin
      expires_at: string | null; // Expired date token
    };
  }
}
