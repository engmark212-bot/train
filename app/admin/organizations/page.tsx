// app/admin/organizations/page.tsx
"use client"
import { useEffect, useState } from "react"
import { supabaseClient } from "../../../lib/supabaseClient"

export default function AdminOrganizations() {
  const [orgs, setOrgs] = useState<any[]>([])

  useEffect(() => {
    fetchOrgs()
  }, [])

  const fetchOrgs = async () => {
    const { data } = await supabaseClient.from("organizations").select("*")
    setOrgs(data || [])
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Organizations</h2>
      <table className="min-w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Domain</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orgs.map((org) => (
            <tr key={org.id}>
              <td className="border px-4 py-2">{org.name}</td>
              <td className="border px-4 py-2">{org.domain}</td>
              <td className="border px-4 py-2">{org.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
