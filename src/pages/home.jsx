import React from "react";
import { Routes, Route } from "react-router-dom";
import Slider from "../components/Sliders/Slider";
import Footer from "../components/Footer/footer";

const Home = () => {
  return (
    <div>
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section>
                  <h3>Top 10: Places</h3>
                  <Slider category="places" />
                </section>
                <section>
                  <h3>UNESCO World Heritage Sites</h3>
                  <Slider category="heritage" />
                </section>
                <section>
                  <h3>Lakes</h3>
                  <Slider category="lakes" />
                </section>
                <section>
                  <h3>Mountains</h3>
                  <Slider category="mountains" />
                </section>
              </>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
