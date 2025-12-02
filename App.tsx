import React, { useState, useEffect } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectCard from './components/ProjectCard';
import DeveloperInfo from './components/DeveloperInfo';
import LandingPage from './components/LandingPage';
import { generateProjectIdeas } from './services/geminiService';
import { GeneratorOptions, ProjectIdea, HistoryItem } from './types';
import { 
  Layout, 
  Plus, 
  Trash2, 
  Box, 
  ChevronRight,
  AlertTriangle,
  User,
  History,
  Menu,
  X,
  RefreshCw
} from 'lucide-react';

const HISTORY_KEY = 'resume_project_history';

// Added 'landing' to ViewState
type ViewState = 'landing' | 'home' | 'results' | 'developer';

const App: React.FC = () => {
  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);
  const [lastOptions, setLastOptions] = useState<GeneratorOptions | null>(null);
  
  // Default view is now 'landing'
  const [view, setView] = useState<ViewState>('landing');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = (newIdeas: ProjectIdea[], options: GeneratorOptions) => {
    // Basic check to ensure localStorage is working
    try {
        const newItem: HistoryItem = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            options,
            ideas: newIdeas
        };
        
        const updatedHistory = [newItem, ...history].slice(0, 20); 
        setHistory(updatedHistory);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
        setActiveHistoryId(newItem.id);
    } catch (e) {
        console.error("LocalStorage save failed", e);
    }
  };

  const handleGenerate = async (options: GeneratorOptions) => {
    setLoading(true);
    setError(null);
    setLastOptions(options);
    try {
      const generatedIdeas = await generateProjectIdeas(options);
      setIdeas(generatedIdeas);
      saveToHistory(generatedIdeas, options);
      setView('results');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastOptions) {
      handleGenerate(lastOptions);
    }
  };

  const loadFromHistory = (item: HistoryItem) => {
    setIdeas(item.ideas);
    setActiveHistoryId(item.id);
    setLastOptions(item.options);
    setView('results');
    setIsMobileMenuOpen(false);
  };

  const handleNewProject = () => {
    setView('home');
    setActiveHistoryId(null);
    setIdeas([]);
    setError(null);
    setIsMobileMenuOpen(false);
  };

  const handleDeveloperClick = () => {
    setView('developer');
    setActiveHistoryId(null);
    setIsMobileMenuOpen(false);
  }

  const clearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if(confirm("Clear all history?")) {
        setHistory([]);
        localStorage.removeItem(HISTORY_KEY);
        handleNewProject();
    }
  };

  // If on landing page, render full screen Landing component
  if (view === 'landing') {
    return <LandingPage onStart={() => setView('home')} />;
  }

  return (
    <div className="app-layout">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
            <div className="brand" onClick={handleNewProject}>
            <div className="brand-icon">
                <Box color="white" size={20} />
            </div>
            <div className="brand-text">
                <h1>DevArchitect</h1>
                <p>Project Builder</p>
            </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>HISTORY</span>
            {history.length > 0 && (
                <button 
                    onClick={clearHistory}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    title="Clear History"
                >
                    <Trash2 size={14} color="#71717a" />
                </button>
            )}
            </div>
        </div>

        <div className="history-container">
            {history.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <History size={24} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                    <p>No history yet.</p>
                </div>
            ) : (
                <div className="history-list">
                    {history.map((item) => (
                        <div 
                            key={item.id} 
                            className={`history-item ${activeHistoryId === item.id ? 'active' : ''}`}
                            onClick={() => loadFromHistory(item)}
                        >
                            <Layout size={16} className="flex-shrink-0" />
                            <div className="history-info">
                                <span className="history-title">{item.options.industry} : {item.ideas[0]?.title}</span>
                                <span className="history-date">
                                    {new Date(item.timestamp).toLocaleDateString()}
                                </span>
                            </div>
                            {activeHistoryId === item.id && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
        
        <div className="sidebar-footer">
            <div 
                className={`history-item ${view === 'developer' ? 'active' : ''}`}
                onClick={handleDeveloperClick}
                style={{marginBottom: 0}}
            >
                <User size={16} />
                <div className="history-info">
                    <span className="history-title">Developer</span>
                    <span className="history-date">About & Contact</span>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="main-content">
        <div className="top-bar">
            {/* Mobile Menu Toggle */}
            <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div>
                {/* Breadcrumbs or Title could go here */}
            </div>
            {/* Show New Project button ONLY on results view */}
            {view === 'results' && (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                   <button 
                      className="btn-new" 
                      onClick={handleRegenerate} 
                      disabled={loading}
                      title="Regenerate with same options"
                    >
                      <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                      {loading ? 'Building...' : 'Regenerate'}
                   </button>
                   <button className="btn-new" onClick={handleNewProject}>
                       <Plus size={16} /> New Project
                   </button>
                </div>
            )}
        </div>

        {error && (
            <div style={{ 
                background: 'rgba(220, 38, 38, 0.1)', 
                border: '1px solid rgba(220, 38, 38, 0.2)', 
                padding: '1rem', 
                borderRadius: '8px',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                color: '#fca5a5'
            }}>
                <AlertTriangle />
                {error}
            </div>
        )}

        {view === 'home' && (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        What do you want to build?
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        AI-powered project architecture & specifications.
                    </p>
                </div>
                <ProjectForm onSubmit={handleGenerate} isLoading={loading} />
            </div>
        )}

        {view === 'results' && (
            <div className="animate-fade-in">
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Generated Specifications</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Here are 2 tailored project architectures for your portfolio.</p>
                </div>
                
                <div className="results-container">
                    {ideas.map((idea, index) => (
                        <ProjectCard key={index} project={idea} />
                    ))}
                </div>
            </div>
        )}

        {view === 'developer' && (
            <DeveloperInfo />
        )}
      </main>
    </div>
  );
};

export default App;