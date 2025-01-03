import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

// Pastikan NextAuthOptions sudah sesuai dengan kebutuhan di authOptions
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
