
import { useState } from "react"

interface Student {
  id: string;
  name: string;
}

interface AttendanceFormProps {
  supabase: any;
  students: Student[];
  onAttendanceMarked: () => void;
}

export default function AttendanceForm({ supabase, students, onAttendanceMarked }: AttendanceFormProps) {
  const [selectedStudent, setSelectedStudent] = useState("")
  const [date, setDate] = useState("")
  const [status, setStatus] = useState("present")

  interface AttendanceRecord {
    student_id: string;
    date: string;
    status: string;
  }

  interface SupabaseClient {
    from: (table: string) => {
      insert: (record: AttendanceRecord) => Promise<{ error: any }>;
    };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { error } = await (supabase as SupabaseClient).from("attendance").insert({
      student_id: selectedStudent,
      date,
      status,
    });
    if (error) console.error("Error marking attendance:", error);
    else {
      setSelectedStudent("");
      setDate("");
      setStatus("present");
      onAttendanceMarked();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="student">
          Student
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="student"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          required
        >
          <option value="">Select a student</option>
          {students.map((student) => (
           <option key={student.id} value={student.id}>
           {student.name}
         </option>
         
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
          Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
          Status
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
      </div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Mark Attendance
      </button>
    </form>
  )
}

