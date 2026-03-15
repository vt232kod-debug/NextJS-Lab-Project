import EnvClientLogger from "@/components/EnvClientLogger";

export default function EnvPage() {
  // Log to server console (this code runs ONLY on the server)
  console.log("=== Server Console ===");
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  console.log("API_SECRET:", process.env.API_SECRET);
  console.log("NEXT_PUBLIC_APP_NAME:", process.env.NEXT_PUBLIC_APP_NAME);
  console.log("======================");

  // Server-side variables
  const databaseUrl = process.env.DATABASE_URL;
  const apiSecret = process.env.API_SECRET;
  // Public variable (available on both server and browser)
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-brand-dark">
        Environment Variables
      </h1>

      {/* Client component — logs NEXT_PUBLIC_ variable to the browser console */}
      <EnvClientLogger appName={appName} />

      <div className="space-y-4">
        {/* Server-side variables */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">
            Server-only Variables
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            These are only available on the server. Check terminal console for
            logs.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
              <span className="font-mono text-sm text-gray-700">
                DATABASE_URL
              </span>
              <span className="font-mono text-sm text-brand">
                {databaseUrl ?? "not set"}
              </span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
              <span className="font-mono text-sm text-gray-700">
                API_SECRET
              </span>
              <span className="font-mono text-sm text-brand">
                {apiSecret ?? "not set"}
              </span>
            </div>
          </div>
        </div>

        {/* Public variable */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">
            Public Variable (available in browser)
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            NEXT_PUBLIC_ prefixed variables are embedded into the client bundle.
            Check browser console (F12) for logs.
          </p>
          <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
            <span className="font-mono text-sm text-gray-700">
              NEXT_PUBLIC_APP_NAME
            </span>
            <span className="font-mono text-sm text-brand">
              {appName ?? "not set"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
