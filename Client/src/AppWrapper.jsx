import React, { useEffect, useState, lazy } from 'react';

// Lazy load the App
const App = lazy(() => import('./App'));

function AppWrapper() {
  const [showMinLoader, setShowMinLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMinLoader(false);
    }, 400); // Show for at least 0.4s

    return () => clearTimeout(timer);
  }, []);

  const Loader = () => (
    <div className="fixed inset-0 bg-white flex justify-center items-center z-[9999]">
      <img
        src="/Loader.gif"
        alt="Loading..."
        className="w-[100px] h-[100px]" // LinkedIn-like size
      />
    </div>
  );

  return showMinLoader ? (
    <Loader />
  ) : (
    <React.Suspense fallback={<Loader />}>
      <App />
    </React.Suspense>
  );
}

export default AppWrapper;
