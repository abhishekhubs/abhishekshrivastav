import React from "react";

export default function Education() {
  return (
    <div className="education-page px-4 py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Education</h1>
      <div className="space-y-6">
        <div className="bg-white/10 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-purple-600">Bachelor of Technology (B.Tech) in Computer Science</h2>
          <p className="text-slate-300 mt-1">Indian Institute of Technology, Delhi</p>
          <p className="text-slate-400 text-sm">2019 - 2023</p>
        </div>
        <div className="bg-white/10 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-purple-600">Senior Secondary (XII), Science</h2>
          <p className="text-slate-300 mt-1">Delhi Public School, Delhi</p>
          <p className="text-slate-400 text-sm">2017 - 2019</p>
        </div>
        <div className="bg-white/10 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-purple-600">Secondary (X)</h2>
          <p className="text-slate-300 mt-1">Delhi Public School, Delhi</p>
          <p className="text-slate-400 text-sm">2015 - 2017</p>
        </div>
      </div>
    </div>
  );
}
