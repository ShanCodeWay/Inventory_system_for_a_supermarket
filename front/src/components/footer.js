import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css'; // Import Bootstrap CSS
import { Container ,Typography} from "@mui/material";

const footerStyle = {
  backgroundColor:'#08083d', 
  color: 'black',
  fontWeight: 'bold', 
  padding: '20px', 
  evalStyle: 'white',
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <Container  maxWidth="xm" >
        <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            
          <p className="col-md-4 mb-0 text-body-secondary"> <Typography variant="h6" style={{ color: 'white' }}>&copy; 2023 Company, Inc</Typography></p>

          <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <svg className="bi me-2" width="40" height="32">
              <use href="#bootstrap" />
            </svg>
          </a>

          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary"> <Typography variant="h6" style={{ color: 'white' }}>Home</Typography></a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary"><Typography variant="h6" style={{ color: 'white' }}>Features</Typography></a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary"><Typography variant="h6" style={{ color: 'white' }}>Pricing</Typography></a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary"><Typography variant="h6" style={{ color: 'white' }}>FAQs</Typography></a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary"><Typography variant="h6" style={{ color: 'white' }}>About</Typography></a></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
