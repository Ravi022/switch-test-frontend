"use client";
import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const runScript = async () => {
    setLoading(true);
    setMessage("");
    setError(false);

    try {
      const res = await axios.get("https://switch-test-backend.vercel.app/");
      const data = res.data;

      if (data.success) {
        setMessage(`✅ Script ran!\n${data.output}`);
      } else {
        throw new Error(data.error);
      }
    } catch (e) {
      if (e.response) {
        // server responded with a status outside 2xx
        setMessage(
          `HTTP ${e.response.status}: ${e.response.statusText}\n${e.response.data}`
        );
      } else {
        // network or other
        setMessage(`Error: ${e.message}`);
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <button
        onClick={runScript}
        disabled={loading}
        className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          loading
            ? "bg-blue-300 cursor-not-allowed text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Running...
          </span>
        ) : (
          "Run Server-Side Script"
        )}
      </button>

      {message && (
        <div
          className={`mt-6 px-4 py-3 rounded-lg shadow text-sm whitespace-pre-line w-full max-w-lg text-center ${
            error ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
