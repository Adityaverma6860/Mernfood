// import React from 'react'
// import { Link } from 'react-router-dom'
// export default function Footer() {
//   return (
//     <div>
//       <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
//         <div className="col-md-4 d-flex align-items-center">
//           <Link
//             to="/"className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">   
//             </Link>
//           <span 
//           className="text-muted">
//             FOOD </span>
//         </div>
//       </footer>
//     </div>
//   )
// }

// update code 
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
            aria-label="Go to homepage">
            {/* Logo or Home link */}
            <span className="text-muted">FOOD</span>
          </Link>
        </div>
        <div className="col-md-4 text-center text-muted">
          <p className="mb-0">© {new Date().getFullYear()} FOOD. All rights reserved.</p>
        </div>
        <div className="col-md-4 text-center">
          <Link to="/about" className="text-muted text-decoration-none mx-2">About</Link>
          <Link to="/contact" className="text-muted text-decoration-none mx-2">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
