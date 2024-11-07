// App.js
import React from 'react';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Home page component
const HomePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">High School Rowing Database</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-8 text-gray-600">
            Welcome to the comprehensive database of high school rowers.
            Search through profiles, stats, and achievements of rowing athletes.
          </p>
          <button
            onClick={() => onNavigate('database')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            View Database
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

// Database page component (from previous artifact)
const RowerDatabase = ({ onNavigate }) => {
  const [rowers] = useState([
    { id: 1, name: "Alex Smith", school: "Riverside High", grade: 11, position: "Stroke", height: "6'2\"", weight: "175" },
    { id: 2, name: "Emma Johnson", school: "Lake View Academy", grade: 10, position: "Bow", height: "5'10\"", weight: "150" },
    { id: 3, name: "Michael Chen", school: "Riverside High", grade: 12, position: "2-seat", height: "6'0\"", weight: "165" },
    { id: 4, name: "Sarah Williams", school: "St. Mary's", grade: 9, position: "3-seat", height: "5'11\"", weight: "155" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRowers, setFilteredRowers] = useState(rowers);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = rowers.filter(rower => 
      rower.name.toLowerCase().includes(term) ||
      rower.school.toLowerCase().includes(term) ||
      rower.position.toLowerCase().includes(term)
    );
    
    setFilteredRowers(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-blue-500 hover:text-blue-600"
            >
              ← Back to Home
            </button>
            <CardTitle className="text-2xl font-bold">High School Rowing Database</CardTitle>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, school, or position..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full"
            />
          </div>

          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRowers.map(rower => (
                    <tr key={rower.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{rower.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rower.school}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rower.grade}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rower.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rower.height}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rower.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredRowers.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No results found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Main App component with simple routing
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
      {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === 'database' && <RowerDatabase onNavigate={setCurrentPage} />}
    </div>
  );
};

export default App;
