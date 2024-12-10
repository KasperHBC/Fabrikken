// EmployeeCard.js
import React from 'react';
import { Mail } from 'lucide-react';

const EmployeeCard = React.memo(
  ({ name, title, email, personality, department, hasImage }) => {
    const imageFileName = name
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/æ/g, 'ae')
      .replace(/ø/g, 'oe')
      .replace(/å/g, 'aa');

    // Inkluder process.env.PUBLIC_URL i billedstierne
    const imagePath = hasImage
      ? `${process.env.PUBLIC_URL}/assets/images/employees/${imageFileName}.jpeg`
      : `${process.env.PUBLIC_URL}/assets/images/employees/default.jpg`;

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <img
              src={imagePath}
              alt={name}
              className="w-16 h-16 rounded-full mr-4 object-cover"
              loading="lazy"
            />
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
  }
);

export default EmployeeCard;
