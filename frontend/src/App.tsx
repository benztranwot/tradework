import { HealthStatus } from "./HealthStatus";

function App() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-700">TradeWork</h1>
        <p className="mt-2 text-gray-600">
          Connecting homeowners with tradespeople.
        </p>
        <div className="mt-4">
          <HealthStatus />
        </div>
      </div>
    </main>
  );
}

export default App;
