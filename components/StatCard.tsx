// components/StatCard.tsx
"use client"
export default function StatCard({ title, value, action, actionLabel }: any) {
  return (
    <div className="bg-gray-700 p-4 rounded">
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="mb-2">{value}</p>
      {action && (
        <button onClick={action} className="bg-blue-600 text-white px-2 py-1 rounded">
          {actionLabel}
        </button>
      )}
    </div>
  )
}
