type Student = {
  id: string;
  name: string;
};

type AttendanceRecord = {
  id: number;
  date: string;
  status: string;
  students: { name: string }; // Updated to match the Supabase join response
};


type AttendanceListProps = {
  attendanceRecords: AttendanceRecord[];
};

export default function AttendanceList({ attendanceRecords }: AttendanceListProps) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Student Name</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record.id}>
<td className="border px-4 py-2">{record.students?.name}</td>
<td className="border px-4 py-2">{record.date}</td>
              <td className="border px-4 py-2">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


