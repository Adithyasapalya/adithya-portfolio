import { FormEvent, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import "./App.css";

const navItems = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Blogs", id: "blogs" },
  { label: "Experience", id: "experience" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" },
];

const skillGroups = [
  {
    number: "01",
    title: "INTELLIGENCE",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
    ],
  },
  {
    number: "02",
    title: "GENERATIVE AI",
    skills: [
      "Generative AI",
      "LLMs",
      "RAG",
      "Prompt Engineering",
    ],
  },
  {
    number: "03",
    title: "AGENTIC SYSTEMS",
    skills: [
      "Agentic AI",
      "AI Agents",
      "Multi-Agent Workflows",
      "AI Automation",
    ],
  },
  {
    number: "04",
    title: "ENGINEERING",
    skills: [
      "Python",
      "SQL",
      "C",
      "Java",
      "HTML",
      "CSS",
    ],
  },
];

const technologies = [
  "Python",
  "SQL",
  "C",
  "Java",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "LangChain",
  "LangGraph",
  "FastAPI",
  "Streamlit",
  "FAISS",
  "Ollama",
  "Llama 3",
  "OpenAI API",
  "MiroFish",
  "Hermes Agent",
  "MATLAB",
  "Simulink",
  "Git",
  "GitHub",
];

const supportingSkills = [
  "Power BI",
  "Tableau",
  "PowerPoint",
  "Canva",
  "Picsart",
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <main>
      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="brand" onClick={closeMenu}>
          ADITHYA<span>.exe</span>
        </a>

        <div className="nav-right">
          <span className="availability">
            <span className="status-dot" />
            AVAILABLE FOR OPPORTUNITIES
          </span>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
            <span>{menuOpen ? "CLOSE" : "MENU"}</span>
          </button>
        </div>
      </header>

      {/* MENU */}
      {menuOpen && (
        <nav className="menu-overlay">
          <div className="menu-heading">NAVIGATION / 01—06</div>

          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={closeMenu}
              className="menu-link"
            >
              <span className="menu-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span>{item.label}</span>

              <ArrowUpRight className="menu-arrow" size={24} />
            </a>
          ))}
        </nav>
      )}

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-topline">
          <span>PORTFOLIO / 2026</span>
          <span>AI · ML · GENAI · AGENTIC SYSTEMS · AUTOMATION</span>
        </div>

        <div className="hero-content">
          <div className="hero-kicker">
            <span className="red-line" />
            AIML ENGINEER
          </div>

          <h1>
            ENGINEERING
            <br />
            THE <span className="outline-text">UNSEEN.</span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-description">
              I'm Adithya Sapalya — an AIML engineer exploring intelligent
              systems, generative AI, and autonomous agents to build
              solutions for real-world problems.
            </p>

            <a href="#about" className="explore-button">
              <span>MEET THE ENGINEER</span>

              <span className="button-icon">
                <ArrowUpRight size={20} />
              </span>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit orbit-outer">
            <span className="orbit-node node-red" />
          </div>

          <div className="orbit orbit-middle">
            <span className="orbit-node node-yellow" />
          </div>

          <div className="orbit orbit-inner">
            <span className="orbit-node node-blue" />
          </div>

          <div className="core-glow">
            <div className="core">
              <span>AIML</span>
            </div>
          </div>

          <span className="data-particle particle-one" />
          <span className="data-particle particle-two" />
          <span className="data-particle particle-three" />

          <span className="visual-label">01 / INTELLIGENCE</span>
          <span className="visual-coordinate">12° 58' N / 77° 35' E</span>
        </div>

        <a href="#about" className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={16} />
        </a>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="section-topline">
          <span>02 / IDENTITY</span>
          <span>ADITHYA ASHOK SAPALYA</span>
        </div>

        <div className="about-intro">
          <div className="about-image-wrap">
            <div className="about-image-placeholder">
              <span>IMAGE / 001</span>
              <span>IDENTITY LOADING...</span>
            </div>

            <div className="about-image-corner corner-tl" />
            <div className="about-image-corner corner-tr" />
            <div className="about-image-corner corner-bl" />
            <div className="about-image-corner corner-br" />

            <span className="about-image-label">
              ADITHYA / AIML ENGINEER
            </span>
          </div>

          <div className="about-intro-content">
            <div className="section-label">
              <span className="red-line" />
              WHO IS ADITHYA?
            </div>

            <h2>
              ADITHYA
              <br />
              <span className="outline-text">SAPALYA.</span>
            </h2>

            <p className="about-role">
              ARTIFICIAL INTELLIGENCE
              <br />
              & MACHINE LEARNING ENGINEER
            </p>

            <p className="about-description">
              I build practical AI systems around machine learning,
              generative AI, LLMs, RAG, and agentic workflows — turning
              ideas into systems that can reason, automate, and solve
              real-world problems.
            </p>
          </div>
        </div>

        <div className="about-scroll-note">
          <span>KEEP GOING</span>
          <span className="about-scroll-line" />
          <span>THERE'S MORE</span>
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills-section" id="skills">
        <div className="section-topline">
          <span>03 / CAPABILITIES</span>
          <span>THE TOOLSET</span>
        </div>

        <div className="skills-heading">
          <div className="section-label">
            <span className="red-line" />
            WHAT I WORK WITH
          </div>

          <h2>
            BUILDING
            <br />
            <span className="outline-text">INTELLIGENCE.</span>
          </h2>
        </div>

        <div className="skill-groups">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.number}>
              <div className="skill-group-top">
                <span className="skill-number">{group.number}</span>
                <span className="skill-group-title">{group.title}</span>
              </div>

              <div className="skill-list">
                {group.skills.map((skill) => (
                  <span className="skill-item" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="technology-cloud">
          <div className="technology-heading">
            <span>TECHNOLOGIES / FRAMEWORKS</span>
            <span>21 SYSTEMS</span>
          </div>

          <div className="technology-list">
            {technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>

        <div className="supporting-tools">
          <span className="supporting-heading">VISUAL / DATA</span>

          <div className="supporting-list">
            {supportingSkills.map((skill) => (
              <span className="supporting-item" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MYSTERY */}
      <section className="mystery-section">
        <div className="mystery-topline">
          <span>04 / UNKNOWN</span>
          <span>DATA FOUND</span>
        </div>

        <div className="mystery-content">
          <span className="mystery-small">YOU KNOW THE TOOLS.</span>

          <h2>
            BUT...
            <br />
            <span>WHAT DID I</span>
            <br />
            <span className="outline-text">BUILD</span>
            <span className="mystery-question"> ??</span>
          </h2>

          <div className="mystery-bottom">
            <span>SCROLL TO FIND OUT</span>
            <ArrowDown size={18} />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="projects-section" id="projects">
        <div className="section-topline">
          <span>05 / SYSTEMS</span>
          <span>PROJECT ARCHIVE</span>
        </div>

        <div className="coming-section">
          <span className="section-label">
            <span className="red-line" />
            PROJECTS
          </span>

          <h2>
            THE WORK
            <br />
            <span className="outline-text">COMES NEXT.</span>
          </h2>
        </div>
      </section>

      {/* BLOGS */}
      <section className="blogs-section" id="blogs">
        <div className="section-topline">
          <span>06 / THOUGHTS</span>
          <span>WRITING & RESEARCH</span>
        </div>

        <div className="coming-section">
          <span className="section-label">
            <span className="red-line" />
            BLOGS
          </span>

          <h2>
            BUILDING IS ONE THING.
            <br />
            <span className="outline-text">
              UNDERSTANDING IS ANOTHER.
            </span>
          </h2>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="experience-section" id="experience">
        <div className="section-topline">
          <span>07 / EXPERIENCE</span>
          <span>WHERE I BUILT IT</span>
        </div>

        <div className="coming-section">
          <span className="section-label">
            <span className="red-line" />
            EXPERIENCE
          </span>

          <h2>
            FROM
            <br />
            <span className="outline-text">LEARNING</span>
            <br />
            TO ENGINEERING.
          </h2>
        </div>
      </section>

      {/* RESUME */}
      <section className="resume-section" id="resume">
        <div className="section-topline">
          <span>08 / PROFILE</span>
          <span>FULL PROFILE</span>
        </div>

        <div className="coming-section">
          <span className="section-label">
            <span className="red-line" />
            RESUME
          </span>

          <h2>
            YOU'VE SEEN
            <br />
            WHAT I BUILD.
          </h2>

          <p>
            Here's the complete profile — education, experience,
            certifications, leadership, and technical skills.
          </p>

          <div className="resume-actions">
            <a href="/resume.pdf" className="explore-button">
              <span>VIEW RESUME</span>

              <span className="button-icon">
                <ArrowUpRight size={20} />
              </span>
            </a>

            <a
              href="/resume.pdf"
              download
              className="resume-download"
            >
              DOWNLOAD PDF
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="section-topline">
          <span>09 / EXIT</span>
          <span>WHAT'S NEXT?</span>
        </div>

        <div className="contact-layout">
          <div className="contact-intro">
            <span className="section-label">
              <span className="red-line" />
              CONTACT
            </span>

            <h2>
              LET'S BUILD
              <br />
              <span className="outline-text">SOMETHING.</span>
            </h2>

            <p>
              Have an opportunity, project, collaboration, or idea?
              Send me the details and I'll get back to you.
            </p>

            <div className="contact-direct">
              <span className="contact-direct-label">
                DIRECT CHANNELS
              </span>

              <a href="mailto:adithyasapalya30@gmail.com">
                EMAIL
                <ArrowUpRight size={18} />
              </a>

              <a
                href="https://linkedin.com/in/adithya-sapalya/"
                target="_blank"
                rel="noreferrer"
              >
                LINKEDIN
                <ArrowUpRight size={18} />
              </a>

              <a
                href="https://github.com/Adithyasapalya"
                target="_blank"
                rel="noreferrer"
              >
                GITHUB
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-row">
              <label>
                <span>NAME</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </label>

              <label>
                <span>EMAIL</span>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                <span>COMPANY</span>
                <input
                  type="text"
                  name="company"
                  placeholder="Company / Organization"
                />
              </label>

              <label>
                <span>SUBJECT</span>
                <input
                  type="text"
                  name="subject"
                  placeholder="What is this about?"
                  required
                />
              </label>
            </div>

            <label>
              <span>MESSAGE</span>
              <textarea
                name="message"
                placeholder="Tell me about the opportunity, project, or idea..."
                required
              />
            </label>

            <div className="contact-submit-row">
              <button type="submit" className="contact-submit">
                <span>SEND MESSAGE</span>

                <span className="button-icon">
                  <ArrowUpRight size={20} />
                </span>
              </button>

              {formSubmitted && (
                <span className="form-success">
                  MESSAGE READY / THANK YOU.
                </span>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default App;