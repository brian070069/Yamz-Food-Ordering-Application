import React from "react";
import Header from "./components/Header/Header";
import Footer from "../../components/Footer";
import PaymentArea from "./components/payments/PaymentArea";
import HomeBody from "./HomeBody";
import HomeContextProvider from "./HomeContext";

const Home = () => {
  return (
    <HomeContextProvider>
      <div className="home__container">
        <Header />
        <HomeBody />
        <PaymentArea />
        <Footer />
      </div>
    </HomeContextProvider>
  );
};

export default Home;
