// src/Home.js
import React from 'react';
import Layout from './Layout.js';
import Hero from './Hero.js';
import Section from './Section.js';
import MachinesCatalog from './MachinesCatalog.js';
import ProjectsShowcase from './ProjectsShowcase.js';
import HeroVideo from './assets/videos/hero-video.mp4';
import Statistics from './Statistics.js'; 

const Home = () => (
  <Layout>
    {/* Hero Sektion */}
    <Hero
      title="Velkommen til Fabrikken"
      subtitle="Et innovativt læringsprojekt, der forbereder fremtidens fagfolk."
      backgroundVideo={HeroVideo}
      scrollToId="Maskiner"
    />

    {/* Statistik Sektion */}
    <Section id="statistics" title="Vores Statistikker" className="bg-white text-gray-900">
      <Statistics />
    </Section>

    {/* Maskinkatalog Sektion */}
    <Section id="Maskiner" title="Maskinkatalog">
      <MachinesCatalog />
    </Section>

    {/* Projekter Sektion */}
    <Section id="projects" title="Projekter">
      <ProjectsShowcase />
    </Section>
  </Layout>
);

export default Home;
