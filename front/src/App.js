import React from 'react';
import Inventory from './pages/Inventory';
import Footer from './components/footer';
import Header from './components/Header';
import './components/bootstrap.min.css';
import black from './black-background.png';

function App() {
  const appStyle = {
    backgroundImage: `url(${black})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    
  };

  return (
    <div className="App" style={appStyle}>
      <Header />
      <Inventory />
      <Footer />
    </div>
  );
}

export default App;
