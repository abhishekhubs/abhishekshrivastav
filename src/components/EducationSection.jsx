import React from "react";

export default function EducationSection() {
  return (
    <section id="EducationSection" className="education-section px-4 py-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Education</h2>
      <div className="space-y-6">
        <div className="bg-white/10 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-purple-600">Bachelor of Engineering (B.E) in Computer Science</h3>
          <p className="text-slate-300 mt-1">Srinivas Institute of Technology, Mangaluru</p>
          <p className="text-slate-300 mt-1">Current GPA: 7.88</p>
          <p className="text-slate-400 text-sm">2023-2027</p>
        </div>
        <div className="bg-white/10 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-purple-600">Senior Secondary (XII), Computer Science</h3>
          <p className="text-slate-300 mt-1">Sri Chaitanya PU college,Mangaluru</p>
          <p className="text-slate-300 mt-1">Grade:74%</p>
          <p className="text-slate-400 text-sm">2021-2023</p>
        </div>
        <div className="bg-white/10 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-purple-600">Secondary (X)</h3>
          <p className="text-slate-300 mt-1">Sri Chaitanya Techno School,Mangaluru</p>
          <p className="text-slate-300 mt-1">Grade: 73%</p>
          <p className="text-slate-400 text-sm">2021</p>
        </div>
      </div>
    </section>
  );
}
