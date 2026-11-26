import { useEffect, useState } from "react";

type Status = "loading" | "connected" | "error";

export function HealthStatus() {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    fetch("/health/db")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { database: string }) =>
        setStatus(data.database === "connected" ? "connected" : "error"),
      )
      .catch(() => setStatus("error"));
  }, []);

  const styles: Record<Status, string> = {
    loading: "bg-gray-200 text-gray-700",
    connected: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm ${styles[status]}`}
    >
      API: {status}
    </span>
  );
}
