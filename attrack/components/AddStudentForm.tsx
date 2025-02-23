
import { useState } from "react"

interface AddStudentFormProps {
  supabase: any;
  onStudentAdded: () => void;
}

export default function AddStudentForm({ supabase, onStudentAdded }: AddStudentFormProps) {
  const [name, setName] = useState("")
  const [studentId, setStudentId] = useState("")

  interface Student {
    name: string;
    student_id: string;
  }

  interface Supabase {
    from: (table: string) => {
      insert: (data: Student) => Promise<{ error: any }>;
    };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { error } = await supabase.from("students").insert({ name, student_id: studentId })
    if (error) console.error("Error adding student:", error)
    else {
      setName("")
      setStudentId("")
      onStudentAdded()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">
          Student ID
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="studentId"
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Add Student
      </button>
    </form>
  )
}

