import { useEffect, useState } from "react";
import jwtdecode from "jwt-decode";

const HomeLeftHeader = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtdecode(token);
      const name = decodedToken.first_name;
      setName(name);
    }
  }, []);

  return (
    <div className="home__leftHeader row">
      <div className="headerleft">
        <h2>Welcome {name}</h2>
        <h3>Queue mastery, fast and stellar efficiency</h3>
        <p>
          Qmelter is a cutting-edge school eating system designed to transform
          the way we manage queues. Qmelter empowers streamline queues, minimize
          wait times, and optimize the overall dining experience. Say goodbye to
          chaotic queues and hello to a seamless dining experience with Qmelter.
        </p>
      </div>
      <div className="headerRight">
        <img
          src="https://ik.imagekit.io/kzmqi6dbk/tr:w-500/eating.png?updatedAt=1689529672412"
          alt="eating"
        />
      </div>
    </div>
  );
};

export default HomeLeftHeader;
