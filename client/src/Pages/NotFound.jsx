import { useEffect } from "react"

const NotFound = () => {
  useEffect(() => {
    document.title = "404 - Not Found";
  }, []);

  return <img src="https://http.dog/404.jpg" />;
};

export default NotFound;
