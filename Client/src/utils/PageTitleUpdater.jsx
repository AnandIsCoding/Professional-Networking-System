import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PageTitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let title = "LinkedIn"; // default title

    if (path === "/") title = "Home | LinkedIn";
    else if (path.startsWith("/feed")) title = "Feed | LinkedIn";
    else if (path.startsWith("/mynetwork")) title = "My Network | LinkedIn";
    else if (path.startsWith("/resume")) title = "Resume | My App";
    else if (path.startsWith("/message")) title = "Messages | LinkedIn";
    else if (path.startsWith("/notifications"))
      title = "Notifications | LinkedIn";
    else if (path.startsWith("/profile")) title = "Profile | LinkedIn";
    else if (path.startsWith("signup")) title = "Signup | LinkedIn";

    document.title = title;
  }, [location]);

  return null;
}

export default PageTitleUpdater;
