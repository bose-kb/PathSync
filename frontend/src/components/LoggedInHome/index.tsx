import React from "react";
import Navbar from "../Navbar";
import Hero from "../Hero";
import  Button  from "../Button";
import { Link, useNavigate } from "react-router-dom";
import ChatWithUs from "../ChatBot/ChatWithUs";

const LoggedInHome: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle user logout, e.g., clear tokens, reset state
    // Redirect to the home page
    navigate("/");
  };

  return (
    <>
      <Navbar 
        isLoggedIn 
        onLogout={handleLogout} 
      />
      <Hero>
        <div className="relative h-full flex flex-col items-center justify-end text-center text-white px-4 pb-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Ready for Your Next Step?
          </h1>
          <Link to="/assesments">
            <Button primary className="mt-6">Take Assessment</Button>
          </Link>
          <ChatWithUs />
        </div>
      </Hero>
    </>
  );
};

export default LoggedInHome;