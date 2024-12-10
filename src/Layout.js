// src/Layout.js
import React, { useLayoutEffect, useState } from "react";
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = ({ isOpen, toggleMenu }) => (
  <nav className="bg-slate-800 text-white sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <span className="text-xl font-bold">FABRIKKEN</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="px-3 py-2 hover:text-blue-300">Forside</Link>
          <Link to="/about" className="px-3 py-2 hover:text-blue-300">Om Os</Link>
          <Link to="/arbejdsgange" className="px-3 py-2 hover:text-blue-300">Arbejdsgange</Link>
          <Link to="/vr-app" className="px-3 py-2 hover:text-blue-300">VR App</Link>
          <Link to="/sales" className="px-3 py-2 hover:text-blue-300">Produkter</Link>
          <Link to="/employees" className="px-3 py-2 hover:text-blue-300">Medarbejdere</Link>
          <Link to="/admin" className="px-3 py-2 hover:text-blue-300">Admin</Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Navigation */}
    {isOpen && (
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 hover:bg-slate-700">Forside</Link>
          <Link to="/about" className="block px-3 py-2 hover:bg-slate-700">Om Os</Link>
          <Link to="/arbejdsgange" className="block px-3 py-2 hover:bg-slate-700">Arbejdsgange</Link>
          <Link to="/vr-app" className="block px-3 py-2 hover:bg-slate-700">VR App</Link>
          <Link to="/sales" className="block px-3 py-2 hover:bg-slate-700">Produkter</Link>
          <Link to="/employees" className="block px-3 py-2 hover:bg-slate-700">Medarbejdere</Link>
          <Link to="/admin" className="block px-3 py-2 hover:bg-slate-700">Admin</Link>
        </div>
      </div>
    )}
  </nav>
);

const SideNavigation = () => {
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState("");

  useLayoutEffect(() => {
    const allSections = Array.from(
      document.querySelectorAll("section[id]")
    ).map((section) => ({
      id: section.id,
      label: section.dataset.label || section.id,
    }));

    // Tilføj 'top' og 'bottom' sektionerne
    const extendedSections = [
      { id: "page-top", label: "Til Toppen" },
      ...allSections,
      { id: "page-bottom", label: "Til Bunden" },
    ];

    setSections(extendedSections);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      let currentSectionId = "";

      if (window.scrollY === 0) {
        currentSectionId = "page-top";
      } else if (window.scrollY + windowHeight >= documentHeight - 1) {
        currentSectionId = "page-bottom";
      } else {
        for (let section of allSections) {
          const element = document.getElementById(section.id);
          if (element) {
            const elementTop = element.offsetTop;
            if (scrollPosition >= elementTop) {
              currentSectionId = section.id;
            } else {
              break;
            }
          }
        }
      }

      setActiveSection(currentSectionId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col space-y-4 z-50">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id === "page-top" ? "" : section.id}`}
          className="flex items-center justify-end"
        >
          {/* Tekst */}
          <span
            className={`text-sm text-gray-700 mr-2 text-right ${
              activeSection === section.id ? "font-semibold text-blue-500" : ""
            } w-24 md:w-32 lg:w-40`}
          >
            {section.label}
          </span>
          {/* Cirkel */}
          <span
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? "bg-blue-500 w-6 h-6 shadow-lg"
                : "bg-gray-300"
            }`}
          ></span>
        </a>
      ))}
    </div>
  );
};

const Footer = () => (
  <footer className="bg-slate-800 text-white py-8">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
          <p>Email: info@fabrikken.dk</p>
          <p>Telefon: +45 XX XX XX XX</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Adresse</h3>
          <p>Industrivej XX</p>
          <p>XXXX By, Danmark</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Uddannelsespartner</h3>
          <p>Udviklet af Videnscenteret for Automation og Teknologi</p>
          <p>i Samarbejde med xxxx skole</p>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-slate-400">
        © 2024 Fabrikken - Uddannelsesplatform til erhvervsskoler
      </div>
    </div>
  </footer>
);

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <Navigation isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      <div className="relative">
        <main className="w-full" style={{ padding: 0, margin: 0 }}>
          {children}
        </main>
        <SideNavigation />
      </div>
      <div id="page-bottom"></div> 
      <Footer />
    </>
  );
};

export default Layout;
