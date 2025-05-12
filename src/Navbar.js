import React from 'react';

const Navbar = ({ appName }) => {
  const navbarStyle = {
    backgroundColor: '#005f9e',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const appNameStyle = {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left'
  };

  return (
    <nav style={navbarStyle}>
      <h1 style={appNameStyle}>{appName}</h1>
    </nav>
  );
};

export default Navbar; 