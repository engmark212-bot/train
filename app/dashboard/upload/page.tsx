// app/dashboard/upload/page.tsx
"use client"
import { useState } from "react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState("")

  const uploadFile = async () => {
    if (!file) return
    const form = new FormData()
    form.append("file", file)
    form.append("orgId", "ORG_ID_HERE") // replace dynamically in real app

    const res = await fetch("/api/upload", { method: "POST", body: form })
    const data = await res.json()
    if (data.success) setMessage("File uploaded successfully!")
    else setMessage("Upload failed.")
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Upload Company Documents</h2>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={uploadFile} className="bg-blue-600 text-white px-4 py-2 rounded ml-2">
        Upload
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}
