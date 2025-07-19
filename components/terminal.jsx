"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TerminalIcon } from "lucide-react";

export default function Terminal({ logs }) {
  const terminalRef = useRef(null);

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <TerminalIcon className="h-4 w-4" />
          Terminal Output
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={terminalRef}
          className="bg-gray-900 text-green-400 font-mono text-sm p-4 h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
        >
          {logs.length === 0 ? (
            <div className="text-gray-500">
              {">"} Terminal ready. Click "Run Server-Side Script" to execute...
            </div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="mb-1">
                {log.startsWith("$") ? (
                  <span className="text-yellow-400">{log}</span>
                ) : log.includes("Error") || log.includes("HTTP") ? (
                  <span className="text-red-400">{log}</span>
                ) : log.includes("successfully") ||
                  log.includes("completed with exit code 0") ? (
                  <span className="text-green-400">{log}</span>
                ) : (
                  <span className="text-gray-300">{log}</span>
                )}
              </div>
            ))
          )}
          <div className="flex items-center mt-2">
            <span className="text-yellow-400 mr-2">{">"}</span>
            <div className="w-2 h-4 bg-green-400 animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
