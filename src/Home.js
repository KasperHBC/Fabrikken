import React, { useState } from 'react';
import { Menu, X, ChevronDown, Database, Users, Cog, Box, Briefcase, Info, Search, Mail, Phone } from 'lucide-react';
import CNCFraser from './assets/images/5-axis-End-Milling-Machine-for-Aluminum-Profile-4.jpg';
import UniversalRobot from './assets/images/Universal-Robot.png';
import P1SCombo from './assets/images/P1S_Combo_v1.jpg';
import CEOImage from './assets/images/employees/Kasper_Andersen.jpeg';
import AutomationEngineerImage from './assets/images/employees/Anders_Jensen.jpeg';
import PLCProgrammerImage from './assets/images/employees/Maria_Larsen.jpeg';
import { Link } from 'react-router-dom';


const Navigation = ({ isOpen, toggleMenu }) => (
  <nav className="bg-slate-800 text-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <span className="text-xl font-bold">FABRIKKEN</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#home" className="px-3 py-2 hover:text-blue-300">Forside</a>
          <li><Link to="/about">Om Os</Link></li>
          <a href="#workflows" className="px-3 py-2 hover:text-blue-300">Arbejdsgange</a>
          <a href="#machines" className="px-3 py-2 hover:text-blue-300">Maskiner</a>
          <a href="#employees" className="px-3 py-2 hover:text-blue-300">Medarbejdere</a>
          <a href="#projects" className="px-3 py-2 hover:text-blue-300">Projekter</a>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>
    
    {/* Mobile Navigation */}
    {isOpen && (
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="#home" className="block px-3 py-2 hover:bg-slate-700">Forside</a>
          <a href="#about" className="block px-3 py-2 hover:bg-slate-700">Om Os</a>
          <a href="#workflows" className="block px-3 py-2 hover:bg-slate-700">Arbejdsgange</a>
          <a href="#machines" className="block px-3 py-2 hover:bg-slate-700">Maskiner</a>
          <a href="#employees" className="block px-3 py-2 hover:bg-slate-700">Medarbejdere</a>
          <a href="#projects" className="block px-3 py-2 hover:bg-slate-700">Projekter</a>
        </div>
      </div>
    )}
  </nav>
);

const Hero = () => (
  <div className="relative bg-slate-900 text-white py-24">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Velkommen til Fabrikken</h1>
        <p className="text-xl mb-8">Et moderne produktionsmiljø for fremtidens fagfolk</p>
        <div className="text-sm text-slate-400">Uddannelsesplatform til erhvervsskoler</div>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <Icon className="w-6 h-6 text-blue-600 mr-2" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ProductCard = ({ title, image, specs, description }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="h-48 bg-gray-200 flex items-center justify-center">
      <img src={image} alt={title} className="object-cover w-full h-full" />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        {specs.map((spec, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-500">{spec.label}</span>
            <span className="font-medium">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const EmployeeCard = ({ image, name, title, email, personality, department }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-start justify-between">
      <div className="flex items-center">
        <img src={image} alt={name} className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-600">{title}</p>
          <p className="text-sm text-gray-500 mt-2">{department}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-800">
         <Mail size={20} />
        </a>
      </div>
    </div>
    <p className="text-sm text-gray-600 mt-4">{personality}</p>
  </div>
);


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

const MachinesCatalog = () => {
  const machines = [
    {
      title: "CNC Fræsemaskine (5-akset)",
      image: CNCFraser,
      description: "Moderne 5-akset CNC fræsemaskine til præcis bearbejdning af komplekse emner.",
      specs: [
        { label: "Arbejdsområde", value: "800x600x500mm" },
        { label: "Spindelhastighed", value: "24000 RPM" },
        { label: "Styring", value: "Siemens 840D" }
      ]
    },
    {
      title: "Industrirobot",
      image: UniversalRobot,
      description: "Fleksibel 6-akset industrirobot til automatiseret montage og materialehåndtering.",
      specs: [
        { label: "Rækkevidde", value: "1.8m" },
        { label: "Payload", value: "10kg" },
        { label: "Præcision", value: "±0.03mm" }
      ]
    },
    {
      title: "3D-Printer",
      image: P1SCombo,
      description: "Professionel 3D-printer til hurtig prototypefremstilling og specialkomponenter.",
      specs: [
        { label: "Bygevolumen", value: "300x300x400mm" },
        { label: "Lagtykkelse", value: "0.05-0.4mm" },
        { label: "Materialer", value: "PLA, ABS, PETG" }
      ]
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Maskinpark</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {machines.map((machine, index) => (
            <ProductCard key={index} {...machine} />
          ))}
        </div>
      </div>
    </section>
  );
};

const EmployeeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Alle");

  const employees = [
    {
      image: CEOImage,
      name: "Kasper Andersen",
      title: "Direktør CEO",
      email: "vr3@edu.mercantec.dk",
      department: "Ledelse",
      personality: "Målrettet og karismatisk med en positiv, fremadskuende tilgang."
    },
    {
      image: AutomationEngineerImage,
      name: "Anders Jensen",
      title: "Automationsingeniør",
      email: "aj@fabrikken.dk",
      department: "Automation og Proces",
      personality: "Teknisk dygtig og tænker strategisk. Velovervejede og detaljerede tilgange."
    },
    {
      image: PLCProgrammerImage,
      name: "Maria Larsen",
      title: "PLC-programmør",
      email: "ml@fabrikken.dk",
      department: "Automation og Proces",
      personality: "Nysgerrig og analytisk. Giver præcise og faktuelle svar."
    }
  ];

  const departments = ["Alle", "Ledelse", "Automation og Proces", "Data og Kommunikation"];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "Alle" || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Medarbejdere</h2>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Søg efter navn eller stilling..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg bg-white"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee, index) => (
            <EmployeeCard key={index} {...employee} />
          ))}
        </div>
      </div>
    </section>
  );
};

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

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      <Hero />
      
      <main>
        <MachinesCatalog />
        <EmployeeDirectory />
        <ProjectsShowcase />
      </main>

      <footer className="bg-slate-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
              <p>Email: info@fabrikken.dk</p>
              <p>Telefon: +45 XX XX XX XX</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Adresse</h3>
              <p>Industrivej XX</p>
              <p>XXXX By, Danmark</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Uddannelsespartner</h3>
              <p>I samarbejde med Erhvervsskolen Danmark</p>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-slate-400">
            © 2024 Fabrikken - Uddannelsesplatform til erhvervsskoler
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;