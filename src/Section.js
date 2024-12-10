// Section.js
import React from 'react';

const Section = ({ id, title, children, className, topRightContent }) => (
  <section id={id} className={`py-12 px-4 ${className || ''} relative`}>
    <div className="container mx-auto relative">
      {topRightContent && (
        <div className="absolute top-0 right-0 mt-0 mr-0">
          {topRightContent}
        </div>
      )}
      <h2 className="text-3xl font-bold mb-8">{title}</h2>
      {children}
    </div>
  </section>
);

export default Section;
