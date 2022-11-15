import Typewriter from "typewriter-effect";
import NewArrivals from "./NewArrivals";
import BestSellers from "./BestSellers";
import AllCategoriesList from "./all categories/AllCategoriesList";
import AllSubCategoriesList from "./all sub categories/AllSubCategoriesList";

const Home = () => {
  return (
    <div>
      {" "}
      <div
        className="p-5 text-center mb-6"
        style={{ backgroundColor: "#3E3D53" }} // Jumbotron
      >
        <div className="display-3  fw-bold" style={{ color: "#AEBD93" }}>
          <Typewriter
            options={{
              strings: ["New Arrivals", "Best Sellers", "Best Quality"],
              autoStart: true,
              loop: true,
              pauseFor: 1000,
              delay: 60,
            }}
          />
        </div>
      </div>
      <div
        className="p-4 text-center mb-5 text-secondary"
        style={{ backgroundColor: "#3E3D53" }} //jumbotron
      >
        <p className="display-6"> New Arrivals</p>
      </div>
      <NewArrivals />
      <div
        className="p-4 text-center  mb-5 text-secondary "
        style={{ backgroundColor: "#3E3D53" }}
      >
        <p className="display-6"> Best Sellers </p>
      </div>
      <BestSellers />
      <div
        className="p-4 text-center  mb-5 text-secondary "
        style={{ backgroundColor: "#3E3D53" }}
      >
        <p className="display-6"> All Categories </p>
      </div>
      <AllCategoriesList />
      <div
        className="p-4 text-center  mb-5 text-secondary "
        style={{ backgroundColor: "#3E3D53" }}
      >
        <p className="display-6"> All sub Categories </p>
      </div>
      <AllSubCategoriesList />
    </div>
  );
};

export default Home;
