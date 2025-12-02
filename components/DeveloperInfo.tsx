import React from 'react';
import { 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  Cpu, 
  Database, 
  Code2, 
  Globe, 
  Atom, 
  Zap, 
  Sparkles, 
  Palette,
  Hash
} from 'lucide-react';

const DeveloperInfo: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '3rem', marginTop: '2rem' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Mission Section */}
        <div className="dev-card">
          <h2><Cpu size={20} className="text-primary" /> The Mission</h2>
          <p style={{ lineHeight: '1.7', color: '#e4e4e7' }}>
            The <strong>Project Builder</strong> is crafted to bridge the gap between academic concepts and industry demands. For <strong>engineering students</strong> and aspiring developers, it acts as a virtual Senior Architect, providing the detailed specifications needed to build high-impact, portfolio-worthy applications.
          </p>
          <p style={{ lineHeight: '1.7', color: '#e4e4e7', marginTop: '1rem' }}>
            Instead of generic tutorials, this tool challenges you with <strong>real-world problems</strong>, comprehensive <strong>implementation roadmaps</strong>, and critical <strong>security considerations</strong>. It empowers you to stop just "coding" and start "engineering" solutions that demonstrate professional competency to future employers.
          </p>
        </div>

        {/* Tech Stack Section */}
        <div className="dev-card">
          <h2><Database size={20} className="text-secondary" /> Tech Stack</h2>
          <div className="tech-grid">
             <div className="tech-item" style={{ borderColor: 'rgba(97, 218, 251, 0.3)' }}>
               <Atom size={16} color="#61DAFB" /> 
               <span style={{ color: '#61DAFB' }}>React 19</span>
             </div>
             <div className="tech-item" style={{ borderColor: 'rgba(49, 120, 198, 0.3)' }}>
               <Code2 size={16} color="#3178C6" /> 
               <span style={{ color: '#3178C6' }}>TypeScript</span>
             </div>
             <div className="tech-item" style={{ borderColor: 'rgba(142, 117, 178, 0.3)' }}>
               <Sparkles size={16} color="#c084fc" /> 
               <span style={{ color: '#c084fc' }}>Gemini API_KEY</span>
             </div>
             <div className="tech-item" style={{ borderColor: 'rgba(255, 214, 46, 0.3)' }}>
               <Zap size={16} color="#FFD62E" /> 
               <span style={{ color: '#FFD62E' }}>Vite</span>
             </div>
             <div className="tech-item" style={{ borderColor: 'rgba(249, 115, 22, 0.3)' }}>
               <Palette size={16} color="#f97316" /> 
               <span style={{ color: '#f97316' }}>Lucide React</span>
             </div>
             <div className="tech-item" style={{ borderColor: 'rgba(38, 77, 228, 0.3)' }}>
               <Hash size={16} color="#264de4" /> 
               <span style={{ color: '#264de4' }}>CSS3</span>
             </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="dev-card contact-card">
          <h2>Contact the Developer</h2>
          <p style={{marginBottom: '1.5rem', color: '#a1a1aa'}}>
            Built by <strong>Venkata Narendra M</strong>.
          </p>
          
          <div className="contact-row">
              <a href="mailto:mallelanarendra88@gmail.com" className="contact-icon-btn" title="mallelanarendra88@gmail.com">
                  <Mail size={24} color="#f87171" />
                  <span>Email</span>
              </a>
              <a href="https://github.com/MVnarendra117" target="_blank" rel="noopener noreferrer" className="contact-icon-btn" title="GitHub">
                  <Github size={24} color="#fff" />
                  <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/venkata-narendra-m-40a11b226/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="contact-icon-btn" title="LinkedIn">
                  <Linkedin size={24} color="#0a66c2" />
                  <span>LinkedIn</span>
              </a>
              <div className="contact-icon-btn" title="Vijayawada, India" style={{ cursor: 'default' }}>
                  <MapPin size={24} color="#34d399" />
                  <span>Vijayawada/India</span>
              </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default DeveloperInfo;