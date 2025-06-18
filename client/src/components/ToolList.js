import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import confetti from 'canvas-confetti';
import { useFavorites } from '../contexts/FavoritesContext';
import { useToast } from '../hooks/use-toast';

const mockTools = [
  {
    id: 1,
    name: "ChatGPT",
    category: "Writing",
    url: "https://chat.openai.com",
    excerpt: "Advanced conversational AI for content creation, research, and brainstorming.",
    tags: ["AI Assistant", "Chatbot", "Content Generation"],
    pricing: "Freemium"
  },
  {
    id: 2,
    name: "DALL-E 2",
    category: "Image Generation",
    url: "https://openai.com/dall-e-2",
    excerpt: "Create realistic images and art from text descriptions.",
    tags: ["Image AI", "Creative", "Art"],
    pricing: "Pay-per-use"
  },
  {
    id: 3,
    name: "Midjourney",
    category: "Image Generation",
    url: "https://midjourney.com",
    excerpt: "AI-powered image generation with stunning artistic results.",
    tags: ["Image AI", "Art", "Creative"],
    pricing: "Subscription"
  },
  {
    id: 4,
    name: "GitHub Copilot",
    category: "Development",
    url: "https://github.com/features/copilot",
    excerpt: "AI pair programmer that helps you write code faster.",
    tags: ["Programming", "Code Assistant", "Developer Tools"],
    pricing: "Subscription"
  },
  {
    id: 5,
    name: "Grammarly",
    category: "Writing",
    url: "https://grammarly.com",
    excerpt: "AI writing assistant for grammar, style, and tone suggestions.",
    tags: ["Writing", "Grammar", "Editing"],
    pricing: "Freemium"
  },
  {
    id: 6,
    name: "Loom",
    category: "Video",
    url: "https://loom.com",
    excerpt: "Quick video messaging with AI-powered transcriptions.",
    tags: ["Video", "Communication", "Transcription"],
    pricing: "Freemium"
  }
];

const ToolList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  const { data: tools = mockTools, isLoading, error } = useQuery({
    queryKey: ['tools', selectedCategory],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (selectedCategory) {
        return mockTools.filter(tool =>
          tool.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
      return mockTools;
    },
  });

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = Array.from(new Set(mockTools.map(tool => tool.category)));

  const handleFavorite = async (tool) => {
    if (isFavorite(tool.id)) {
      toast({
        title: "Already in favorites!",
        description: `${tool.name} is already in your favorites.`,
        variant: "destructive",
      });
      return;
    }
    addFavorite(tool.id);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    toast({
      title: "Added to favorites! 🎉",
      description: `${tool.name} has been added to your favorites.`,
    });
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 64, height: 64, border: "6px solid #5a8dee", borderTop: "6px solid #e9edfb",
          borderRadius: "50%", animation: "spin 1s linear infinite"
        }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="card text-center py-4">
          <div className="card-title" style={{ color: "red" }}>Error</div>
          <div>
            Failed to load tools. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1>Discover Amazing AI Tools</h1>
        <p style={{ fontSize: "1.25rem", color: "#333", maxWidth: 600, margin: "0 auto" }}>
          Explore the latest AI-powered tools to boost your productivity and creativity
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search tools by name or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: 220,
            maxWidth: 300,
            padding: "0.75rem 1rem",
            borderRadius: "1.5rem",
            border: "1px solid #b3c2e6",
            fontSize: "1rem"
          }}
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          style={{
            minWidth: 180,
            padding: "0.75rem 1rem",
            borderRadius: "1.5rem",
            border: "1px solid #b3c2e6",
            fontSize: "1rem"
          }}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {(searchTerm || selectedCategory) && (
          <button
            style={{
              borderRadius: "2rem",
              padding: "0.5rem 1.5rem",
              fontWeight: 600,
              border: "none",
              background: "#5a8dee",
              color: "#fff",
              transition: "background 0.2s",
              marginRight: "0.5rem",
              marginTop: "0.5rem",
              cursor: "pointer"
            }}
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results Count */}
      <div style={{ marginBottom: "1.5rem", color: "#5a8dee", fontWeight: 600 }}>
        {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div style={{
          background: "#fff",
          borderRadius: "1.25rem",
          boxShadow: "0 4px 24px rgba(90, 141, 238, 0.08)",
          padding: "2rem",
          marginBottom: "2rem",
          maxWidth: "500px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center"
        }}>
          <div style={{ color: "#5a8dee", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>No tools found</div>
          <div>
            Try adjusting your search or filter criteria
          </div>
        </div>
      ) : (
        <div>
          {filteredTools.map(tool => (
            <div key={tool.id} style={{
              background: "#fff",
              borderRadius: "1.25rem",
              boxShadow: "0 4px 24px rgba(90, 141, 238, 0.08)",
              padding: "2rem",
              marginBottom: "2rem",
              maxWidth: "500px",
              marginLeft: "auto",
              marginRight: "auto"
            }}>
              <div style={{ color: "#5a8dee", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>{tool.name}</div>
              <div style={{ color: "#6c757d", fontSize: "1rem", marginBottom: "0.5rem" }}>
                {tool.category} &nbsp; <span style={{ fontWeight: 400 }}>{tool.pricing}</span>
              </div>
              <div style={{ marginBottom: '1rem' }}>{tool.excerpt}</div>
              <div style={{ marginBottom: "1rem" }}>
                {tool.tags.map(tag => (
                  <span key={tag} style={{
                    display: "inline-block",
                    background: "#e9edfb",
                    color: "#5a8dee",
                    borderRadius: "999px",
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.85rem",
                    marginRight: "0.5rem",
                    marginBottom: "0.25rem"
                  }}>{tag}</span>
                ))}
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  borderRadius: "2rem",
                  padding: "0.5rem 1.5rem",
                  fontWeight: 600,
                  border: "none",
                  background: "#5a8dee",
                  color: "#fff",
                  transition: "background 0.2s",
                  marginRight: "0.5rem",
                  marginTop: "0.5rem",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-block"
                }}
              >
                Visit
              </a>
              <button
                style={{
                  borderRadius: "2rem",
                  padding: "0.5rem 1.5rem",
                  fontWeight: 600,
                  border: "none",
                  background: "#5a8dee",
                  color: "#fff",
                  transition: "background 0.2s",
                  marginRight: "0.5rem",
                  marginTop: "0.5rem",
                  cursor: "pointer"
                }}
                onClick={() => handleFavorite(tool)}
              >
                {isFavorite(tool.id) ? "Unfavorite" : "Favorite"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolList;