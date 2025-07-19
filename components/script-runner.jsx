"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Trash2 } from "lucide-react"

export default function ScriptRunner({ onRunScript, loading, onClearLogs }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Script Runner
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <Button onClick={onRunScript} disabled={loading} className="flex items-center gap-2" size="lg">
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run Server-Side Script
              </>
            )}
          </Button>

          <Button onClick={onClearLogs} variant="outline" size="lg" className="flex items-center gap-2 bg-transparent">
            <Trash2 className="h-4 w-4" />
            Clear Terminal
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
