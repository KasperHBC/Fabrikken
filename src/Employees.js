// Employees.js
import React from 'react';
import Layout from './Layout.js';
import Hero from './Hero.js';
import Section from './Section.js';
import EmployeeDirectory from './EmployeeDirectory.js';
import HeroVideo from './assets/videos/employees-hero-video.mp4';

const Employees = () => (
  <Layout>
    {/* Hero Sektion */}
    <Hero
      title="Mød Vores Team"
      subtitle="Lær vores dedikerede medarbejdere at kende"
      backgroundVideo={HeroVideo} 
      scrollToId="employee-section"
    />
    
    {/* Hovedindhold Sektion */}
    <Section id="employee-section">
      <EmployeeDirectory />
    </Section>
  </Layout>
);

export default Employees;
