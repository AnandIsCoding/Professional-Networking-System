import React, { useEffect, useState, lazy } from "react";
import Swal from "sweetalert2";

const App = lazy(() => import("./App"));

function AppWrapper() {
  const [showMinLoader, setShowMinLoader] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // const checkInternetConnection = async () => {
  //   try {
  //     // Try fetching a fast reliable URL (like a favicon from a reliable server)
  //     const response = await fetch('https://www.google.com/favicon.ico', {
  //       method: 'HEAD',
  //       mode: 'no-cors',
  //       cache: 'no-cache',
  //     });
  //     if (isOffline) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Back Online',
  //         text: 'Your internet connection has been restored.',
  //         timer: 2000,
  //         showConfirmButton: false,
  //       });
  //     }
  //     setIsOffline(false);
  //   } catch (error) {
  //     if (!isOffline) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'You are Offline',
  //         text: 'Your internet connection appears to be lost.',
  //         allowOutsideClick: false,
  //       });
  //     }
  //     setIsOffline(true);
  //   }
  // };

  // useEffect(() => {
  //   // Check every 5 seconds
  //   const interval = setInterval(checkInternetConnection, 5000);

  //   // Initial check
  //   checkInternetConnection();

  //   return () => clearInterval(interval);
  // }, [isOffline]);
  useEffect(() => {
    const handleOnline = () => {
      if (isOffline) {
        Swal.fire({
          icon: "success",
          title: "Back Online",
          text: "Your internet connection has been restored.",
          timer: 2000,
          showConfirmButton: false,
        });
        setIsOffline(false);
      }
    };

    const handleOffline = () => {
      Swal.fire({
        icon: "error",
        title: "You are Offline",
        text: "Your internet connection appears to be lost.",
        allowOutsideClick: false,
      });
      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOffline]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMinLoader(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const Loader = () => (
    <div className="fixed inset-0 bg-white flex justify-center items-center z-[9999]">
      <img src="/Loader.gif" alt="Loading..." className="w-[100px] h-[100px]" />
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
