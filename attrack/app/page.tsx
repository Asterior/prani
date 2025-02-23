"use client";
type AttendanceRecord = {
  id: number;
  date: string;
  status: string;
  students: {
    name: string;
  } | null;
};

import { useState, useEffect } from "react"

import { createClient } from "@supabase/supabase-js"
import AddStudentForm from "../components/AddStudentForm"
import AttendanceForm from "../components/AttendanceForm"
import AttendanceList from "../components/AttendanceList"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Home() {
  const [students, setStudents] = useState<any[]>([])
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStudents()
    fetchAttendanceRecords()
  }, [])

  async function fetchStudents() {
    const { data, error } = await supabase.from("students").select("*")
    if (error) {
      console.error("Error fetching students:", error)
      setError("Failed to fetch students")
    } else {
      setStudents(data)
    }
  }
  async function fetchAttendanceRecords() {
    const { data, error } = await supabase
      .from("attendance")
      .select(`
        id,
        date,
        status,
        students:student_id (name)
      `);
  
    if (error) {
      console.error("Error fetching attendance records:", error);
      setError("Failed to fetch attendance records");
    } else {
      setAttendanceRecords(data);
    }
  }
  
  
  
  
  

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">College Attendance Tracker</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 gap-8">
        <AddStudentForm supabase={supabase} onStudentAdded={fetchStudents} />
        <AttendanceForm supabase={supabase} students={students} onAttendanceMarked={fetchAttendanceRecords} />
        <AttendanceList attendanceRecords={attendanceRecords} />
      </div>
    </main>
  )
}

