import React from "react";
import { useState } from "react";
import styles from "../header/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };
  const removeActive = () => {
    setIsActive(false);
  };
  return (
    <div className="App" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
      {" "}
      <header className="App-header">
        {" "}
        <nav className={`${styles.navbar}`}>
          {" "}
          <Link href="/">
            {" "}
            <Image src="../img/logo.svg" width={100} height={100} alt="logo" className="logo hover:scale-105" />{" "}
          </Link>{" "}
          <ul className={`${styles.navMenu} ${isActive ? styles.active : "ul"}`}>
            {" "}
            <li onClick={removeActive}>
              {" "}
              <Link href="/lineup" className={`${styles.navLink}`}>
                {" "}
                LINEUP{" "}
              </Link>{" "}
            </li>{" "}
            <li onClick={removeActive}>
              {" "}
              <Link href="/schedule" className={`${styles.navLink}`}>
                {" "}
                SCHEDULE{" "}
              </Link>{" "}
            </li>{" "}
            <li onClick={removeActive}>
              {" "}
              <Link href="/booking" className={`${styles.navLink}`}>
                {" "}
                BOOK NOW{" "}
              </Link>{" "}
            </li>{" "}
          </ul>{" "}
          <div className={`${styles.hamburger} ${isActive ? styles.active : ""}`} onClick={toggleActiveClass}>
            {" "}
            <span className={`${styles.bar}`}></span> <span className={`${styles.bar}`}></span> <span className={`${styles.bar}`}></span>{" "}
          </div>{" "}
        </nav>{" "}
      </header>{" "}
    </div>
  );
}
export default Navbar;
