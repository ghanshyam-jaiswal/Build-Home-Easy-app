import React from "react";
import "../css/footer.css";
import { Link } from "react-router-dom";
import { CiFacebook } from "react-icons/ci";
import { LuInstagram } from "react-icons/lu";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutubeSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div
        className="footer-logo1"
        // style={{
        //   backgroundImage: 'url("../assests/home-logo.png")',
        // }}
      ></div>
      <div
        className="footer-info footer-info-title"
        // style={{ color: "rgb(224, 209, 209)" }}
      >
        <h1>Build</h1>
        <h3 style={{color: 'rgb(224, 209, 209)'}}>Home</h3>
        <h1>Easy</h1>
      </div>
      <div className="footer-info">
        <div>About</div>
        <div>Customer Support</div>
        <div>FAQ</div>
        <div>Terms & Conditions</div>
      </div>
      <div className="footer-info">
        <div>
          <CiFacebook className="footer-info-icon" /> Facebook
        </div>
        <div>
          <LuInstagram className="footer-info-icon" />
          Instagram
        </div>
        <div>
          <FaSquareXTwitter className="footer-info-icon" />
          Twitter
        </div>
        <div>
          <FaYoutubeSquare className="footer-info-icon" />
          Youtube
        </div>
      </div>
      <div className="footer-info landing-footer-info-link">
        <div>
          <Link to={"/"}>Home</Link>
        </div>
        <div>
          <Link to={"/signup"}>Sign up</Link>
        </div>
        <div>
          <Link to={"/contact"}>Contact</Link>
        </div>
        <div>
          <Link to={"/about"}>About</Link>
        </div>
      </div>
      <div
        className="footer-logo1"
        style={{
          backgroundImage:
            'url("../Assests/energy-charger-logo-removebg-preview.png")',
        }}
      ></div>
    </div>
  );
};

export default Footer;
