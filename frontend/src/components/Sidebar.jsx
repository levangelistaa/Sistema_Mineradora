import React from 'react';
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">MineraSys</h2>
        <p className="sidebar-subtitle">Plataforma para gestão de operações e logística na mineração.</p>
        <br />
        <p style={{ fontSize: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <FaInstagram size={30} color="#E4405F" /> @MineraSys
        </p>
        <br />
        <p style={{ fontSize: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <FaWhatsapp size={30} color="#25D366" />(88) 4002-8922
        </p>

      </div>
    </aside>
  );
};

export default Sidebar;
