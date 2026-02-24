// app/layout.tsx
import "../globals.css"
import { ReactNode } from "react"
import Sidebar from "../components/Sidebar"

export const metadata = {
  title: "Trainify AI",
  description: "Enterprise AI Training Platform",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
