"use client";

import { useEffect, useState } from "react";

export default function ErrorTime() {
  const [iso, setIso] = useState("...");
  useEffect(() => {
    setIso(new Date().toISOString());
  }, []);
  return <span id="error-time">{iso}</span>;
}
