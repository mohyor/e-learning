import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__text">
        <div className="footer__left">
          <p>
            <a href="https://www.udemy.com/teaching/?ref=teach_footer">
              Teach on Online-Uni
            </a>
          </p>
          <p>
            <a href="https://about.udemy.com/?locale=en-us">About us</a>
          </p>
          <p>
            <a href="https://about.udemy.com/company?locale=en-us#offices">
              Contact us
            </a>
          </p>
        </div>
        <div className="footer__center">
          <p>
            <a href="https://about.udemy.com/careers?locale=en-us">Careers</a>
          </p>
          <p>
            <a href="https://www.udemy.com/support/">Help and Support</a>
          </p>
          <p>
            <a href="https://www.udemy.com/affiliate/">Affiliate</a>
          </p>
        </div>
        <div className="footer__footer__right">
          <p>
            <a href="https://www.udemy.com/terms/">Terms</a>
          </p>
          <p>
            <a href="https://www.udemy.com/terms/privacy/">Privacy policy</a>
          </p>
          <p>
            <a href="https://www.udemy.com/sitemap/">Sitemap</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
