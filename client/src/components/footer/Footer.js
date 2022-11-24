const Footer = () => {
  return (
    <footer
      className=" text-center text-white"
      style={{ backgroundColor: "#2C2B3B", minHeight: "24rem" }}
    >
      <div className="container p-4">
        <section className="mb-4">
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </section>

        <section className="mb-3">
          <form action="">
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2">Sign up for our newsletter</p>
              </div>

              <div className="col-md-5 col-12">
                <div className="form-outline form-white mb-4">
                  <input
                    type="email"
                    id="subscribe"
                    className="form-control"
                    style={{ border: "2px solid #fbfbfb", outline: "none" }}
                  />
                  <label className="form-label" htmlFor="subscribe">
                    Email address
                  </label>
                </div>
              </div>

              <div className="col-auto">
                <button type="submit" className="btn btn-outline-light mb-4">
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </section>

        <section>
          <div className="row d-flex justify-content-center">
            <div className=" col-md-4 mb-4 mb-md-0 text-start  border-start border-secondary">
              <h5 className="text-uppercase text-secondary">
                CUSTOMER SERVICES
              </h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Sell With Us
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className=" col-md-4 mb-4 mb-md-0 text-start  border-start border-secondary">
              <h5 className="text-uppercase text-secondary">LINKS</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    Promotions
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div className=" col-md-4 mb-4 mb-md-0 text-start  border-start border-secondary">
              <h5 className="text-uppercase text-secondary">WAYS TO SHOP</h5>

              <ul className="list-unstyled mb-0 text-start">
                <li>
                  <a href="#!" className="text-white">
                    Just Arrived
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Beauty Offers
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Coupons
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: "#3E3D53" }}>
        Copyright © 2022{"  "}
        <a className="text-white" href="https://programmeraan.com/">
          programmeraan.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
