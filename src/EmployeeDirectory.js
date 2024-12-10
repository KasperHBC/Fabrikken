// EmployeeDirectory.js
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import * as XLSX from 'xlsx';
import EmployeeCard from './EmployeeCard.js';

const EmployeeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Alle');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Funktion til at hente og parse Excel-filen
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          `${process.env.PUBLIC_URL}/assets/data/employees.xlsx`
        );
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

        // Map dataene til de forventede felter
        const mappedData = jsonData.map((item) => ({
          name: item['Navn'],
          title: item['Stilling'],
          email: item['E-mail'],
          department: item['Gruppe'],
          personality: item['Personlighed og Svarstil'],
          hasImage: item['HasImage']?.toLowerCase() === 'true',
        }));

        setEmployees(mappedData);
      } catch (error) {
        console.error('Fejl ved indlæsning af medarbejderdata:', error);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === 'Alle' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Ekstraher unikke afdelinger til dropdown
  const departments = ['Alle', ...new Set(employees.map((emp) => emp.department))];

  return (
    <div>
      {/* Søgning og Filtrering */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
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
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Medarbejderkort */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee, index) => (
          <EmployeeCard key={index} {...employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeDirectory;
