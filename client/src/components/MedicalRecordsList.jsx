import React, { useEffect, useState } from "react";
import MedicalRecordsModal from "../components/modals/MedicalRecordsModal";
import "../styles/Global.css";

export default function MedicalRecordsList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/medicalrecords/getAllRecords`);
        if (!res.ok) throw new Error("Failed to fetch records");
        const data = await res.json();
        setRecords(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const handleUpdate = (updatedRecord) => {
    setRecords((prev) =>
      prev.map((rec) => (rec._id === updatedRecord._id ? updatedRecord : rec))
    );
    setSelectedRecord(null);
  };

  const handleDelete = (deletedId) => {
    setRecords((prev) => prev.filter((rec) => rec._id !== deletedId));
    setSelectedRecord(null);
  };

  if (loading) return <p>Loading records...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="p-4 bg">
      <h2 className="text-2xl font-semibold mb-4">Uploaded Medical Records</h2>

      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {records.map((record) => (
            <div
              key={record._id || `temp-${Date.now()}-${Math.random()}`}
              className="border p-4 rounded-xl shadow hover:shadow-md transition bg-white flex flex-col gap-1 cursor-pointer"
              style={{
                backgroundColor: "var(--medium)",
                border: "1px solid var(--accent)",
                color: "white",
              }}
              onClick={() => setSelectedRecord(record)}
            >
              <div><strong>Description:</strong> {record.description}</div>
              <div><strong>Doctor:</strong> {record.doctorName}</div>
              <div><strong>Category:</strong> {record.category}</div>
              <div><strong>File Name:</strong> {record.originalName}</div>
              <div className="text-sm mt-2">
                <a
                  href={record.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mr-3"
                >
                  View
                </a>
                <a
                  href={`${BACKEND_URL}/api/medicalrecords/download/${record._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRecord && (
        <MedicalRecordsModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}