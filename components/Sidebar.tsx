// components/Sidebar.tsx
import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 p-4 text-white min-h-screen">
      <h2 className="text-xl font-bold mb-6">Trainify AI</h2>
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/upload">Upload Docs</Link>
        <Link href="/dashboard/employees">Employees</Link>
        <Link href="/learn">Training</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </aside>
  )
}
