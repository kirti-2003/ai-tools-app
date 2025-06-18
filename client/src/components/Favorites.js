// === START OF FILE: src/components/Favorites.js ===
import React from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useFavorites } from '../contexts/FavoritesContext';
import { useToast } from '../hooks/use-toast';
import ToolCard from './ToolCard';

// Mock tools data (same as in ToolList)
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

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { toast } = useToast();

  const favoriteTools = mockTools.filter(tool => favorites.includes(tool.id));

  const handleRemove = (tool) => {
    removeFavorite(tool.id);
    toast({
      title: "Removed from favorites",
      description: `${tool.name} has been removed from your favorites.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent mb-2">
            My Favorites
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {favoriteTools.length} {favoriteTools.length === 1 ? 'tool' : 'tools'} saved
          </p>
        </div>
        
        <Link to="/">
          <Button variant="outline" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Browse</span>
          </Button>
        </Link>
      </div>

      {/* Content */}
      {favoriteTools.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            No favorites yet
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Start exploring AI tools and add them to your favorites to see them here!
          </p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Discover Tools
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTools.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onFavorite={() => {}} // Not used in favorites page
              isFavorited={true}
              showRemove={true}
              onRemove={() => handleRemove(tool)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
