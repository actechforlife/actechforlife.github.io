// Layout.js
import React from 'react';

function Layout({ children }) {
    return (
        <div className="container mt-5">
            <div id="root">
                {/* Common header */}
                <h1 className="mb-4">Dr. Hackman's Profile</h1>

                {/* Render page-specific content */}
                {children}
            </div>

            {/* Common footer or additional common components */}
        </div>
    );
}

export default Layout;
