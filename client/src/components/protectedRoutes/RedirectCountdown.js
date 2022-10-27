import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const RedirectCountdown = () => {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preCount) => --preCount);
    }, 1000);

    count === 0 && history.push("/");

    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="container p-5 text-center">
      <div className="row">
        <p>Redirecting you in {count} seconds to Home Page!</p>
      </div>
    </div>
  );
};

export default RedirectCountdown;
