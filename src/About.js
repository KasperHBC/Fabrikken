// About.js
import React from 'react';
import Layout from './Layout.js';
import Hero from './Hero.js';
import Section from './Section.js';
import HeroVideo from './assets/videos/about-hero-video.mp4';


const About = () => (
  <Layout>
    <Hero
      title="Om Fabrikken"
      subtitle="Et innovativt læringsprojekt, der forbereder fremtidens fagfolk."
      backgroundVideo={HeroVideo}
      scrollToId="Generelt om Projektet"
    />
    <Section id="Generelt om Projektet">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Generelt om Projektet */}
        <article className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Generelt om Projektet</h2>
          <p className="text-gray-700 mb-4">
            "Fabrikken" er et innovativt projekt, der kombinerer et industrielt miljø med læring og praktisk træning. Eleverne får mulighed for at arbejde med rigtige produktionsprocesser og avancerede teknologier i et realistisk miljø.
          </p>
          <p className="text-gray-700">
            Projektet omfatter produktion af autonome elektriske køretøjer og industrirobotter, hvilket skaber en sammenhæng i opgaverne og giver eleverne erfaring med tværfagligt samarbejde.
          </p>
        </article>
        {/* Læringsoplevelser */}
        <article className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Læringsoplevelser for Eleverne</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>
              <strong>Praktisk Erfaring:</strong> Arbejde med industrirobotter, CNC-maskiner, 3D-print og PLC-styrede systemer.
            </li>
            <li>
              <strong>Tværfagligt Samarbejde:</strong> Samarbejde på tværs af fagområder som automatik, mekanik og IT.
            </li>
            <li>
              <strong>Reelle Scenarier:</strong> Simulerede industriprocesser tæt på arbejdspladssituationer.
            </li>
            <li>
              <strong>Problemløsning:</strong> Kreativ tænkning og innovative løsninger på udfordringer.
            </li>
            <li>
              <strong>Dokumentation:</strong> Lære at præsentere og dokumentere arbejdet professionelt.
            </li>
          </ul>
        </article>
        {/* Udvikling i Moduler */}
        <article className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Udvikling i Moduler</h2>
          <p className="text-gray-700">
            Projektet er opdelt i moduler for at sikre struktureret udvikling og læring. Hvert modul fokuserer på en bestemt del af produktionen eller en specifik læringserfaring, hvilket gør det muligt for eleverne at fordybe sig i relevante områder.
          </p>
        </article>
        {/* Fremtidsplaner */}
        <article className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Fremtidsplaner</h2>
          <p className="text-gray-700">
            "Fabrikken" er tænkt som et dynamisk projekt, der kan udvides og forbedres i takt med industriens teknologiske udvikling. Dette sikrer, at platformen altid er relevant og fremtidssikret.
          </p>
        </article>
        {/* Konklusion */}
        <article className="bg-white shadow-md rounded-lg p-6 lg:col-span-2">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Konklusion</h2>
          <p className="text-gray-700">
            "Fabrikken" er en innovativ læringsplatform, der forener produktion og læring i et realistisk og praktisk miljø. Projektet giver eleverne de nødvendige kompetencer til at indgå i fremtidens industri gennem struktureret udvikling og anvendelse af moderne teknologier.
          </p>
        </article>
      </div>
    </Section>
  </Layout>
);

export default About;
