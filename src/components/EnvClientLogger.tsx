"use client";

import { useEffect } from "react";

export default function EnvClientLogger({
  appName,
}: {
  appName: string | undefined;
}) {
  useEffect(() => {
    console.log("[Browser Console] NEXT_PUBLIC_APP_NAME:", appName);
    console.log(
      "[Browser Console] Direct access:",
      process.env.NEXT_PUBLIC_APP_NAME
    );
  }, [appName]);

  return null;
}
