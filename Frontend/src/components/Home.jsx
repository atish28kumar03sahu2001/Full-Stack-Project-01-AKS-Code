import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';
export const Home = () => {
    return (
        <>
            <div className="H1_DIV_HD"><h1 className="H1_DIV_HD_H1">Full Stack CRUD</h1></div>
            <div className="DIV_D_P">
                <p className="DIV_D_P_PD">I am Atish Kumar Sahu, a Full Stack Web Developer skilled in Frontend (React, Next.js) and Backend (Node.js, Express). In this project, I demonstrate the implementation of CRUD operations—Create, Read, Update, and Delete—essential for managing data across web applications. The project utilizes modern technologies like HTML5, CSS3, JavaScript (ES6), and React.js, along with tools such as React-JSX for efficient UI, React-Router for seamless navigation, React-Icons for enhanced visuals, and React-AXIOS for API integration. On the backend, Node.js and Express.js are used for creating a robust API, with MongoDB as the database and Mongoose for data modeling. Additional tools include Nodemon for development, Multer for handling file uploads, CORS for cross-origin requests, and dotenv for environment configuration. The project is deployed on Vercel, with version control via GitHub, delivering a complete full-stack web solution.</p>
            </div>
            <div className="DIV_LNK_D">
                <Link className="DIV_LNK_D_LINK" to="/crud">Click Here!</Link>
            </div>
        </>
    );
}