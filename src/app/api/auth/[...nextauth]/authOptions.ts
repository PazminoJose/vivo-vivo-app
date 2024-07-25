import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 14 * 24 * 60 * 60 // 14 days in seconds
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Correo", type: "text", placeholder: "jsmith" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login/web`;
          const res = await fetch(url, {
            body: JSON.stringify(credentials),
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
          });
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          return data;
        } catch (error: any) {
          if (error.cause?.code === "ECONNREFUSED" || error.cause?.code === "ERR_NETWORK")
            throw new Error("Error de conexión, revise su conexión a internet");
          throw new Error(error.message);
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    session({ token, session }) {
      session.user = token.user;
      session.token = token.token;
      return session;
    }
  }
};
