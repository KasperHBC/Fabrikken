// VRApp.js
import React from 'react';
import Layout from './Layout.js';
import Hero from './Hero.js';
import Section from './Section.js';
import ARModelViewer from './ARModelViewer.js';
import KnowledgePortalLink from './KnowledgePortalLink.js';
import {
  FaCogs,
  FaUsers,
  FaLightbulb,
  FaUpload,
  FaHandshake,
  FaComments,
  FaBook,
  FaTools,
  FaShieldAlt,
} from 'react-icons/fa';
import VRDemoVideo from './assets/videos/vr-demo.mp4';
import HeroVideo from './assets/videos/vr-hero-video.mp4';

const VRApp = () => (
  <Layout>
    {/* Hero Sektion */}
    <Hero
      title="Internt VR-Læringsværktøj i Fabrikken"
      subtitle="Styrk samarbejde og kommunikation gennem virtuel træning"
      backgroundVideo={HeroVideo}
      scrollToId="introduction"
    >
      <div className="flex justify-center space-x-4">
        <a
          href="#introduction"
          className="px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition shadow-lg"
        >
          Lær Mere
        </a>
        <a
          href="#how-to-use"
          className="px-6 py-3 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition shadow-lg"
        >
          Sådan Bruger Du Det
        </a>
      </div>
    </Hero>

    {/* Introduktion Sektion */}
    <Section id="introduction" title="Introduktion" className="bg-white text-gray-900">
      <p className="text-lg mb-8">
        I "Fabrikken" bruger vi vores egenudviklede VR-app til at forbedre kommunikation og fagspecifik viden. Appen gør det muligt for medarbejdere at samarbejde i et virtuelt miljø, hvor de øver brugen af korrekte fagtermer i praksis.
      </p>
      {/* Tilføjet erklæring om samarbejde */}
      <p className="text-lg">
        Denne app er udviklet i samarbejde med{' '}
        <strong>Videnscenter for Automation og Teknologi</strong>, som har bidraget med
        ekspertise og ressourcer til at gøre dette projekt muligt.
      </p>
    </Section>

    {/* Funktioner Sektion */}
    <Section id="features" title="Funktioner" className="bg-gray-100 text-gray-900">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Kort 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
          <FaCogs className="text-blue-500 text-6xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold mb-2">Praktisk Træning</h3>
          <p>Saml komplekse objekter i VR og få hands-on erfaring med tekniske komponenter.</p>
        </div>
        {/* Kort 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
          <FaUsers className="text-green-500 text-6xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold mb-2">Samarbejde</h3>
          <p>Arbejd i teams og forbedr kommunikationen ved at bruge korrekte fagtermer.</p>
        </div>
        {/* Kort 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
          <FaLightbulb className="text-purple-500 text-6xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold mb-2">Enkel Brug</h3>
          <p>Intuitiv og brugervenlig app, der kræver minimal træning for at komme i gang.</p>
        </div>
        {/* Kort 4 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
          <FaUpload className="text-yellow-500 text-6xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold mb-2">Tilpasning</h3>
          <p>
            Mulighed for at uploade egne 3D-modeller og skræddersy træningen til specifikke
            projekter.
          </p>
        </div>
      </div>
    </Section>

    {/* Sådan Bruger Du Appen Sektion */}
    <Section
      id="how-to-use"
      title="Sådan Bruger Du Appen"
      className="bg-white text-gray-900"
      topRightContent={
        <KnowledgePortalLink
          url="https://videnscenterportalen.dk/arn/"
          tooltip="Lær mere på Vidensportalen"
        />
      }
    >
      {/* Indhold af sektionen */}
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-semibold mb-4">Forberedelse</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Dan teams på ca. 3 personer.</li>
            <li>Sørg for at have et VR-headset og adgang til en computer eller tablet.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-4">Start af VR-Appen</h3>
          <p>
            VR-brugeren tager headsettet på og vælger en model at samle. AR-brugerne tilgår
            hjemmesiden med 3D-modellen af det samlede objekt.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-4">Gennemførelse af Opgaven</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Kommuniker effektivt ved at bruge korrekte fagtermer.</li>
            <li>Arbejd sammen for at samle objektet inden for 10 minutter.</li>
          </ul>
        </div>
        <div className="relative">
          <video
            src={VRDemoVideo}
            controls
            className="rounded-lg shadow-lg w-full"
          ></video>
        </div>
      </div>
    </Section>

    {/* Fordele ved Appen Sektion */}
    <Section id="benefits" title="Fordele ved Appen" className="bg-gray-100 text-gray-900">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Kort 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
          <FaComments className="text-blue-500 text-6xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold mb-2">Forbedret Kommunikation</h3>
          <p>Forbedrer medarbejdernes kommunikationsevner gennem praktisk øvelse.</p>
        </div>
        {/* Kort 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
          <FaBook className="text-green-500 text-6xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold mb-2">Øget Faglig Forståelse</h3>
          <p>Øger forståelsen af tekniske fagtermer gennem praksis.</p>
        </div>
        {/* Kort 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
          <FaTools className="text-purple-500 text-6xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold mb-2">Nem Anvendelse</h3>
          <p>Nem at anvende uden behov for omfattende træning.</p>
        </div>
        {/* Kort 4 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
          <FaCogs className="text-yellow-500 text-6xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold mb-2">Tilpasningsdygtig</h3>
          <p>Muliggør tilpasning af træningen til specifikke projekter.</p>
        </div>
        {/* Kort 5 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
          <FaHandshake className="text-red-500 text-6xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold mb-2">Fremmer Samarbejde</h3>
          <p>Fremmer samarbejde og teamwork blandt medarbejderne.</p>
        </div>
        {/* Kort 6 - Ny Fordel */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
          <FaShieldAlt className="text-teal-500 text-6xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold mb-2">Sikker Læring</h3>
          <p>Giver et sikkert miljø for træning uden risiko for fysiske skader.</p>
        </div>
      </div>
    </Section>

    {/* AR Model Sektion */}
    <Section id="ar-model" title="Interaktiv AR Model" className="bg-white text-gray-900">
      <ARModelViewer />
    </Section>

    {/* CTA Sektion */}
    <Section id="cta" className="bg-blue-600 text-white text-center">
      <h2 className="text-4xl font-bold mb-4">Klar til at Udforske VR-appen?</h2>
      <p className="text-xl mb-8">Tag del i den virtuelle træning og styrk dine færdigheder!</p>
      <a
        href="#how-to-use"
        className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        Kom i Gang Nu
      </a>
    </Section>
  </Layout>
);

export default VRApp;
