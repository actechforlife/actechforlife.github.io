// aboutMe.js and skills.js
import React from 'react';
import Layout from './Layout';

function AboutMe() {
    return (
        <Layout>
            {/* Page-specific content */}
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">About Me</h5>
                    <p className="card-text">
                        I am Dr. Hackman, with a background in computer science. Passionate about data science, I aspire to make medical AI simple and accessible.
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default AboutMe;
