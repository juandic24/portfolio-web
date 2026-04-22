import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer style={{ borderTop: '2px solid var(--border)', padding: '24px 0', textAlign: 'center' }}>
        <p className="pixel-font text-[6px]" style={{ color: 'var(--green-dim)' }}>
          © {new Date().getFullYear()} &nbsp;·&nbsp; JUAN DIEGO CORTÉS &nbsp;·&nbsp; BACKEND DEVELOPER
        </p>
      </footer>
    </>
  );
}

export default App;
