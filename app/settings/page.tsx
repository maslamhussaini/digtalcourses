'use client'

import { useState } from 'react';
import { INITIAL_COURSES, Course } from '../config';

export default function SettingsPage() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);

  const handlePriceChange = (id: string, newPrice: string) => {
    setCourses(prev => prev.map(c => 
      c.id === id ? { ...c, price: Number(newPrice) } : c
    ));
  };

  const saveSettings = () => {
    // In a real app, make an API call here to save to DB
    console.log("Saving new prices to DB:", courses);
    alert("Settings 'Saved' (Check Console)");
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Course Price Settings</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price (PKR)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input 
                    type="number" 
                    value={course.price}
                    onChange={(e) => handlePriceChange(course.id, e.target.value)}
                    className="border p-1 rounded w-32"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="text-green-600 text-xs">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button 
          onClick={saveSettings}
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}