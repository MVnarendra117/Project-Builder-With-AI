import React, { useState } from 'react';
import { Industry, ComplexityLevel, GeneratorOptions } from '../types';
import { 
  Briefcase, 
  TrendingUp, 
  ShoppingCart, 
  GraduationCap, 
  Users, 
  Cpu,
  Code2,
  Sparkles,
  Shield,
  Globe,
  Layers,
  Bot,
  Blocks,
  Wifi,
  Glasses,
  Database,
  Cloud,
  Container
} from 'lucide-react';

interface ProjectFormProps {
  onSubmit: (options: GeneratorOptions) => void;
  isLoading: boolean;
}

// Map icons to industries
const IndustryIcons: Record<Industry, React.ReactNode> = {
  [Industry.AI_ML]: <Bot size={24} />,
  [Industry.WEB_APP]: <Globe size={24} />,
  [Industry.CYBERSECURITY]: <Shield size={24} />,
  [Industry.BLOCKCHAIN]: <Blocks size={24} />,
  [Industry.IOT]: <Wifi size={24} />,
  [Industry.AR_VR]: <Glasses size={24} />,
  [Industry.DATA_ANALYTICS]: <Database size={24} />,
  [Industry.FINTECH]: <TrendingUp size={24} />,
  [Industry.HEALTHCARE]: <Briefcase size={24} />,
  [Industry.E_COMMERCE]: <ShoppingCart size={24} />,
  [Industry.ED_TECH]: <GraduationCap size={24} />,
  [Industry.SOCIAL]: <Users size={24} />,
  [Industry.CLOUD_INFRA]: <Cloud size={24} />,
  [Industry.EMBEDDED]: <Cpu size={24} />,
  [Industry.DEVOPS]: <Container size={24} />
};

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, isLoading }) => {
  const [industry, setIndustry] = useState<Industry>(Industry.WEB_APP);
  const [complexity, setComplexity] = useState<ComplexityLevel>(ComplexityLevel.ADVANCED);
  const [focusArea, setFocusArea] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ 
      industry, 
      complexity, 
      focusArea: focusArea || 'Modern Tech Stack' 
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <h2>Target Domain</h2>
        <p>Select the type of project or industry.</p>
      </div>

      <div className="selection-grid">
        {Object.values(Industry).map((ind) => (
          <div 
            key={ind}
            className={`tile-option ${industry === ind ? 'selected' : ''}`}
            onClick={() => setIndustry(ind)}
          >
            <div className="tile-icon">
              {IndustryIcons[ind]}
            </div>
            <span className="tile-label">{ind}</span>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2>Complexity Level</h2>
        <p>Choose the depth of engineering required.</p>
      </div>

      <div className="selection-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))' }}>
        {Object.values(ComplexityLevel).map((level) => (
          <div 
            key={level}
            className={`tile-option ${complexity === level ? 'selected' : ''}`}
            onClick={() => setComplexity(level)}
          >
            <div className="tile-icon">
              <Layers size={20} />
            </div>
            <span className="tile-label">{level}</span>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2>Technical Focus</h2>
        <p>Any specific tech or patterns? (Optional)</p>
      </div>

      <div className="input-group">
        <Code2 size={20} className="text-muted" color="#a1a1aa" />
        <input 
          type="text"
          className="input-field"
          placeholder="e.g. Real-time WebSockets, AI Integration, Three.js"
          value={focusArea}
          onChange={(e) => setFocusArea(e.target.value)}
        />
      </div>

      <button 
        onClick={handleSubmit}
        disabled={isLoading}
        className="btn-generate"
      >
        {isLoading ? (
          <>
            <Sparkles className="animate-spin" size={20} />
            Architecting...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Generate Project Concepts
          </>
        )}
      </button>
    </div>
  );
};

export default ProjectForm;