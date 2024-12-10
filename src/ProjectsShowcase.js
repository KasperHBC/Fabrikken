import React from 'react';

const ProjectCard = ({ title, status, description, technologies, progress }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <span className={`px-3 py-1 rounded-full text-sm ${
        status === 'Aktiv' ? 'bg-green-100 text-green-800' :
        status === 'Planlagt' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-600">Fremskridt</span>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 rounded-full h-2" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, index) => (
        <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
          {tech}
        </span>
      ))}
    </div>
  </div>
);

const ProjectsShowcase = () => {
  const projects = [
    {
      title: "Automatiseret Montagestation",
      status: "Aktiv",
      description: "Implementation af collaborative robot til præcis montage af elektroniske komponenter.",
      technologies: ["Robotics", "PLC", "Vision System"],
      progress: 75
    },
    {
      title: "IoT Sensornetværk",
      status: "Planlagt",
      description: "Etablering af trådløst sensornetværk til realtidsovervågning af produktionsparametre.",
      technologies: ["IoT", "Data Analysis", "Cloud"],
      progress: 30
    },
    {
      title: "Digital Twin Implementation",
      status: "Afsluttet",
      description: "Udvikling af digital tvilling til simulering og optimering af produktionsprocesser.",
      technologies: ["3D Modeling", "Simulation", "AI"],
      progress: 100
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Aktuelle Projekter</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
