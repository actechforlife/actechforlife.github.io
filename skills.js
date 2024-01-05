// skills.js
import React from 'react';
import Layout from './Layout';

function Skills() {
    return (
        <Layout>
            {/* Page-specific content */}
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Skills</h5>
                    <ul>
                        <li>Data Science</li>
                        <li>Machine Learning</li>
                        <li>Software Development</li>
                        {/* Add more skills as needed */}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}

export default Skills;
