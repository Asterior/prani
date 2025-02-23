type Student = {
    id: number;
    name: string;
  };
  
  type StudentListProps = {
    students: Student[];
    supabase: any;
    onStudentDeleted: (id: number) => void;
  };
  
  export default function StudentList({ students, supabase, onStudentDeleted }: StudentListProps) {
    async function handleDelete(studentId: number) {
      const { error } = await supabase.from("students").delete().eq("id", studentId);
      if (error) {
        console.error("Error deleting student:", error);
      } else {
        onStudentDeleted(); // Refresh student list after deletion
      }
    }
  
    return (
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Student List</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Student Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(student.id)}
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
  