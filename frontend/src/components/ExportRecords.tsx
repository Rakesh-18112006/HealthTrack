import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ExportRecords: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Download PDF
  const downloadPDF = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/export/pdf", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // Important for PDF download
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "health_records.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("PDF downloaded successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to download PDF");
    } finally {
      setLoading(false);
    }
  };

  // Download JSON
  const downloadJSON = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/export/json",
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "json",
        }
      );

      const dataStr = JSON.stringify(response.data, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "health_records.json");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("JSON downloaded successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to download JSON");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111714] p-6 space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Export Health Records
      </h2>

      <button
        onClick={downloadPDF}
        disabled={loading}
        className="w-64 bg-emerald-500 text-[#111714] py-2 rounded-full font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50"
      >
        {loading ? "Processing..." : "Download PDF"}
      </button>

      <button
        onClick={downloadJSON}
        disabled={loading}
        className="w-64 bg-blue-500 text-white py-2 rounded-full font-bold hover:bg-blue-400 transition-colors disabled:opacity-50"
      >
        {loading ? "Processing..." : "Download JSON"}
      </button>
    </div>
  );
};

export default ExportRecords;
