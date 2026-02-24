// components/RoleplayChat.tsx
"use client"
export default function RoleplayChat({ scenario, answer, setAnswer, submit }: any) {
  return (
    <div className="flex flex-col gap-2">
      <p>Scenario: {scenario}</p>
      <textarea
        className="border p-2 rounded w-full"
        rows={6}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={submit} className="bg-green-600 text-white px-3 py-1 rounded">
        Submit
      </button>
    </div>
  )
}
