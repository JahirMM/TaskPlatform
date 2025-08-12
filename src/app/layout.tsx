import TanstackProvider from "@/providers/TanstackProvider";
import { AuthProvider } from "@/auth/context/AuthContext";
import Header from "@/common/components/Header";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "TaskPlatform | Gestión de Proyectos Colaborativa en Tiempo Real",
  description:
    "TaskPlatform es una plataforma web para organizar proyectos de forma colaborativa y en tiempo real. Crea columnas y tareas, invita a tu equipo, gestiona prioridades y comentarios, y mantente sincronizado con notificaciones instantáneas. Desarrollada con Next.js, React, TypeScript, TailwindCSS y Supabase.",
  keywords: [
    "gestión de proyectos",
    "tablero Kanban",
    "colaboración en tiempo real",
    "Next.js",
    "React",
    "Supabase",
    "organización de tareas",
    "proyectos colaborativos",
    "productividad",
    "Trello",
    "planificación de proyectos",
  ],
  openGraph: {
    title: "TaskPlatform | Gestión de Proyectos Colaborativa en Tiempo Real",
    description:
      "Organiza y gestiona tus proyectos en equipo con TaskPlatform. Tableros, columnas, tareas y colaboración en tiempo real con notificaciones instantáneas.",
    url: "",
    siteName: "TaskPlatform",
    images: [
      {
        url: "/TaskPlatform.png",
        width: 1200,
        height: 630,
        alt: "TaskPlatform - Plataforma de Gestión de Proyectos",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskPlatform | Gestión de Proyectos Colaborativa en Tiempo Real",
    description:
      "Organiza y gestiona proyectos con tu equipo en tiempo real usando TaskPlatform.",
    images: ["/TaskPlatform.png"],
  },
  icons: {
    icon: "/icoBoard.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <TanstackProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
            </main>
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
