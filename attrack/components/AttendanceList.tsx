type Student = {
  id: string;
  name: string;
};

type AttendanceRecord = {
  id: number;
  date: string;
  status: string;
  students: {
    name: string;
  } | null;
};

type AttendanceListProps = {
  attendanceRecords: AttendanceRecord[];
  supabase: any;
  onAttendanceDeleted: () => void;
};

export default function AttendanceList({ attendanceRecords, supabase, onAttendanceDeleted }: AttendanceListProps) {
  async function handleDelete(recordId: number) {
    const { error } = await supabase.from("attendance").delete().eq("id", recordId);
    if (error) {
      console.error("Error deleting attendance:", error);
    } else {
      onAttendanceDeleted(); // Refresh attendance list
    }
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Student Name</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record.id}>
              <td className="border px-4 py-2">{record.students?.name || "Unknown"}</td>
              <td className="border px-4 py-2">{record.date}</td>
              <td className="border px-4 py-2">{record.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(record.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
