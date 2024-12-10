import React from 'react';
import CNCFraser from './assets/images/5-axis-End-Milling-Machine-for-Aluminum-Profile-4.jpg';
import UniversalRobot from './assets/images/Universal-Robot.png';
import P1SCombo from './assets/images/P1S_Combo_v1.jpg';

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

export default MachinesCatalog;
