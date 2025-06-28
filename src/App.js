import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function ContactForm() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "b98705ce-807d-42df-b315-0faf1370c55a");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="mt-6">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 bg-gray-900 p-4 rounded shadow max-w-md"
      >
        <input
          type="text"
          name="from_name"
          required
          placeholder="Your Name"
          className="p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Your Email"
          className="p-2 rounded bg-gray-800 text-white"
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          title="Please enter a valid email address"
        />
        <input
          type="tel"
          name="phone"
          required
          placeholder="Your Phone Number"
          className="p-2 rounded bg-gray-800 text-white"
          pattern="^[6-9]\d{9}$"
          title="Please enter a valid 10-digit Indian phone number"
          maxLength={10}
        />
        <textarea
          name="message"
          required
          placeholder="Your Message"
          className="p-2 rounded bg-gray-800 text-white"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
        >
          Contact Me
        </button>
      </form>
      <span className="block mt-2 text-green-400">{result}</span>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [showThankYou, setShowThankYou] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [imgRotation, setImgRotation] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  // Handler for navigation
  const handleNav = (target) => {
    setPage("home");
    setTimeout(() => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  // Handler for resume download
  const handleResumeDownload = () => {
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 2000); // Hide after 2 seconds
  };

  // Prevent copy and replace clipboard content with "Copying the text is disabled!"
  useEffect(() => {
    const handleCopy = (e) => {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData("text/plain", "Copying the text is disabled!");
      } else if (window.clipboardData) {
        window.clipboardData.setData("Text", "Copying the text is disabled!");
      }
    };
    document.addEventListener("copy", handleCopy);
    return () => {
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  // Handler for mouse movement over profile image
  const handleImgMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setImgRotation({ x: y * 15, y: x * 15 }); // max 15deg tilt
  };

  const handleImgMouseLeave = () => {
    setImgRotation({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleDocumentMouseMove = (e) => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const imgCenterX = rect.left + rect.width / 2;
      const imgCenterY = rect.top + rect.height / 2;
      const dx = e.clientX - imgCenterX;
      const dy = e.clientY - imgCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 2cm ≈ 75px (may vary by screen, but this is a good estimate)
      if (distance < 75) {
        // Normalize and clamp
        const x = Math.max(-1, Math.min(1, dx / (rect.width / 2)));
        const y = Math.max(-1, Math.min(1, dy / (rect.height / 2)));
        setImgRotation({ x: y * 15, y: x * 15 });
      } else {
        setImgRotation({ x: 0, y: 0 });
      }
    };

    document.addEventListener("mousemove", handleDocumentMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 relative overflow-hidden">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center py-4 px-4 bg-gray-900 rounded-lg shadow mb-8 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold text-center md:text-left mb-2 md:mb-0">
          Abhishek's Portfolio
        </h1>
        <nav className="flex justify-center md:justify-end space-x-4">
          <button
            onClick={() => handleNav("home")}
            className="text-white hover:text-blue-400 font-semibold"
          >
            Home
          </button>
          <button
            onClick={() => handleNav("contact")}
            className="text-white hover:text-blue-400 font-semibold"
          >
            Contact
          </button>
          <a
            href="resume.pdf"
            download
            className="text-white hover:text-blue-400 font-semibold"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleResumeDownload}
          >
            Resume
          </a>
        </nav>
      </header>
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Home Section */}
        <div
          id="home"
          className="flex flex-col md:flex-row items-center md:justify-between"
        >
          <div className="md:w-3/4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Abhishek Shrivastav
            </h1>
            <p className="text-lg md:text-xl mb-3 animate-fade-in delay-200">
              <em>Hello!</em>
            </p>
            <p className="text-lg md:text-xl mb-6 animate-fade-in delay-200">
              I'm a Computer Science & Engineering student at Srinivas Institute
              of Technology, Mangalore. Currently pursuing a Bachelor of
              Engineering in Computer Science & Engineering, with a strong focus
              on software development, algorithms, and data structures. Eager to
              apply engineering principles and technical skills to solve
              real-world problems and contribute to cutting-edge projects in the
              tech industry.
            </p>
            <p className="text-lg md:text-xl mb-6 animate-fade-in delay-300">
              Passionate about coding, problem-solving, and continuous learning.
              I enjoy working on projects that challenge my skills and allow me
              to grow as a developer. Let's connect and explore opportunities to
              collaborate on exciting tech ventures!
            </p>
          </div>
          {/* Profile Picture on the right */}
          <div
            className="mt-6 md:mt-0 md:ml-8 flex-shrink-0"
            style={{ marginTop: "1.4cm" }}
          >
            <img
              ref={imgRef}
              src={process.env.PUBLIC_URL + "/p.jpg"}
              alt="Abhishek Shrivastav"
              className="w-40 h-40 object-cover shadow-lg"
              style={{
                background: "#222",
                borderRadius: "1rem",
                transition: "transform 0.2s cubic-bezier(.4,2,.6,1)",
                transform: `rotateX(${imgRotation.x}deg) rotateY(${imgRotation.y}deg)`,
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://ui-avatars.com/api/?name=Abhishek+Shrivastav&background=222&color=fff&size=144";
              }}
            />
          </div>
        </div>

        <section className="mt-12 animate-fade-in delay-500">
          <h2 className="text-2xl font-semibold mb-2">Skills</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Languages: Java, Python, JavaScript, C</li>
            <li>Web: HTML, CSS, JavaScript</li>
            <li>Database: SQL, MongoDB</li>
            <li>Tools: Git, GitHub, VS Code, MySQL</li>
          </ul>
        </section>

        <section className="mt-10 animate-fade-in delay-700">
          <h2
            className="text-2xl font-semibold mb-2 cursor-pointer text-blue-400 hover:underline"
            onClick={() =>
              window.open(
                "https://github.com/abhishekhubs?tab=repositories",
                "_blank"
              )
            }
            title="View all my GitHub repositories"
          >
            Projects
          </h2>
          <div>
            <h3
              className="text-xl font-bold text-green-400 hover:underline cursor-pointer"
              onClick={() =>
                window.open(
                  "https://github.com/abhishekhubs/hackathon",
                  "_blank"
                )
              }
              title="View ZetaOne on GitHub"
            >
              ZetaOne
            </h3>
            <p>
              One-Stop Solution for All Your Service Needs–Anytime, Anywhere!
              Developed a unified platform that connects AC technicians,
              Electricians, Plumbers, Mechanics, carpenters, technicians,
              cleaning and Pest control, home appliances repair, building
              paintings and other service providers with customers, offering
              efficient, reliable, and accessible maintenance services. •Built
              using HTML, CSS, JavaScript. Implemented features for service
              booking, scheduling, and real-time notifications. •Ensured a
              user-friendly interface with responsive design for seamless
              cross-device access Enhanced customer experience by integrating
              search, filtering, and ratings for service providers.
            </p>
          </div>
          <div className="my-4"></div>
          <div>
            <h3
              className="text-xl font-bold text-green-400 hover:underline cursor-pointer"
              onClick={() =>
                window.open(
                  "https://github.com/abhishekhubs/Flood_Awarness-main",
                  "_blank"
                )
              }
              title="View Flood Awareness on GitHub"
            >
              Flood Awareness
            </h3>
            <p>
              Designed and developed a responsive flood awareness web
              application to educate users on flood risks, preparedness
              strategies, and emergency protocols. Integrated live location
              tracking using interactive maps to help users identify flood-prone
              areas in real time. Built with React.js and Tailwind CSS, the
              application offers an engaging UI/UX and is fully
              mobile-responsive. Hosted on Vercel for seamless deployment and
              fast performance.
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section className="mt-10 animate-fade-in delay-800">
          <h2 className="text-2xl font-semibold mb-2">Education</h2>
          <p className="mb-4 text-lg text-gray-200">My Academic Journey:</p>
          <div className="flex flex-col gap-6 md:gap-8 ml-4 border-l-4 border-blue-400 pl-6">
            <div>
              <h3 className="text-xl font-bold">
                Srinivas Institute of Technology, Mangalore
              </h3>
              <p>Bachelor of Engineering in Computer Science & Engineering</p>
              <p className="text-sm text-gray-300">2023 - Present</p>
              <p className="mt-1">
                Relevant Coursework: Data Structures, Algorithms, Software
                Development, Database Management
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Sri Chaitanya PU College</h3>
              <p>Mathematics & Computer Science (PCMC)</p>
              <p>Score: 73%</p>
              <p className="text-sm text-gray-300">2021 - 2023</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Sri Chaitanya Techno School</h3>
              <p>Science Stream</p>
              <p>Score: 72%</p>
              <p className="text-sm text-gray-300">2021</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-10 animate-fade-in delay-900">
          <h2 className="text-2xl font-semibold mb-2">Contact</h2>
          <p>Phone: +91 7892208908</p>
          <p>
            Email:{" "}
            <a
              href="mailto:abhishekshrivastav410@gmail.com"
              className="text-blue-400 underline transition duration-300 hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.7)] hover:text-blue-300"
              style={{ textShadow: "0 0 0 transparent" }}
            >
              abhishekshrivastav410@gmail.com
            </a>
          </p>
          <p className="mt-2">
            <a
              className="text-blue-400 underline transition duration-300 hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.7)] hover:text-blue-300"
              href="https://github.com/abhishekhubs"
              target="_blank"
              rel="noreferrer"
              style={{ textShadow: "0 0 0 transparent" }}
            >
              GitHub
            </a>{" "}
            |{" "}
            <a
              className="text-blue-400 underline transition duration-300 hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.7)] hover:text-blue-300"
              href="https://www.linkedin.com/in/abhishek-shrivastav-717329291/"
              target="_blank"
              rel="noreferrer"
              style={{ textShadow: "0 0 0 transparent" }}
            >
              LinkedIn
            </a>{" "}
            |{" "}
            <a
              className="text-blue-400 underline transition duration-300 hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.7)] hover:text-blue-300"
              href="https://x.com/_abhishek2"
              target="_blank"
              rel="noreferrer"
              style={{ textShadow: "0 0 0 transparent" }}
            >
              X
            </a>
          </p>
          <ContactForm />
        </section>
      </div>
      {/* Footer Section */}
      <footer className="mt-12 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Abhishek Shrivastav. All rights
        reserved.
      </footer>
      {showThankYou && (
        <div
          className="fixed left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 animate-popup"
          style={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            top: "calc(0.3cm + 2rem)",
          }}
        >
          Thank You for Downloading!
        </div>
      )}
    </div>
  );
}

export default App;

/*
@keyframes popup {
  0% { opacity: 0; transform: scale(0.8) translateY(-20px);}
  50% { opacity: 1; transform: scale(1.05) translateY(0);}
  100% { opacity: 1; transform: scale(1) translateY(0);}
}
.animate-popup {
  animation: popup 0.5s cubic-bezier(0.4,0,0.2,1);
}
*/
