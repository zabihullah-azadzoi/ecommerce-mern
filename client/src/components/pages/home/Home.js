import { useState, useEffect } from "react";

import { getSettings } from "../../../functions/settingsFunctions";

import Typewriter from "typewriter-effect";
import NewArrivals from "./NewArrivals";
import BestSellers from "./BestSellers";
import AllCategoriesList from "./all categories/AllCategoriesList";
import AllSubCategoriesList from "./all sub categories/AllSubCategoriesList";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { toast } from "react-toastify";
import defaultBannerImage from "../../../assets/default-banner.jpg";

const Home = () => {
  const [bannerPhotos, setBannerPhotos] = useState([]);
  useEffect(() => {
    getSettings()
      .then((res) => {
        if (res.data && res.data.bannerPhotos)
          setBannerPhotos(res.data.bannerPhotos);
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  }, []);

  return (
    <div>
      {" "}
      <div className=" text-center">
        {/* product images carousel */}
        {bannerPhotos && bannerPhotos.length > 0 ? (
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            centerMode={true}
            showThumbs={false}
            centerSlidePercentage="55"
            style={{ height: "35vh" }}
          >
            {bannerPhotos.map((image, i) => {
              return (
                <div key={i}>
                  <img
                    src={image.url}
                    alt={image.url}
                    style={{ height: "35vh" }}
                  />
                </div>
              );
            })}
          </Carousel>
        ) : (
          <div>
            <img
              src={defaultBannerImage}
              alt="default"
              style={{ height: "35vh", width: "100%" }}
            />
          </div>
        )}
      </div>
      <div
        className="p-3 text-center display-6 fw-bold mb-5 text-secondary"
        style={{ backgroundColor: "#3E3D53" }} //jumbotron
      >
        {" "}
        <Typewriter
          options={{
            strings: ["New Arrivals"],
            autoStart: true,
            loop: true,
            pauseFor: 1000,
            delay: 60,
          }}
        />
      </div>
      <NewArrivals />
      <div
        className="p-3 text-center display-6 fw-bold mb-5 text-secondary"
        style={{ backgroundColor: "#3E3D53" }} //jumbotron
      >
        {" "}
        <Typewriter
          options={{
            strings: ["Best Sellers"],
            autoStart: true,
            loop: true,
            pauseFor: 1000,
            delay: 60,
          }}
        />
      </div>
      <BestSellers />
      <div
        className="p-3 text-center  mb-5 text-secondary "
        style={{ backgroundColor: "#3E3D53" }}
      >
        <p className="display-6"> All Categories </p>
      </div>
      <AllCategoriesList />
      <div
        className="p-3 text-center  mb-5 text-secondary "
        style={{ backgroundColor: "#3E3D53" }}
      >
        <p className="display-6"> All sub Categories </p>
      </div>
      <AllSubCategoriesList />
    </div>
  );
};

export default Home;
