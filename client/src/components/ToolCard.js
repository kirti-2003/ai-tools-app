// === START OF FILE: src/components/ToolCard.js ===
import React from 'react';
import { Heart, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Input from './ui/Input';
import Badge from './ui/Badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/Select';
const ToolCard = ({ 
  tool, 
  onFavorite, 
  isFavorited, 
  showRemove = false, 
  onRemove 
}) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {tool.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {tool.category}
            </CardDescription>
          </div>
          <Badge 
            variant="secondary" 
            className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
          >
            {tool.pricing}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {tool.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.slice(0, 3).map(tag => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-xs bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {tag}
            </Badge>
          ))}
          {tool.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tool.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => window.open(tool.url, '_blank')}
          >
            <ArrowUpRight className="w-4 h-4 mr-1" />
            Visit
          </Button>
          
          {showRemove && onRemove ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={onRemove}
              className="px-3"
            >
              Remove
            </Button>
          ) : (
            <Button
              variant={isFavorited ? "default" : "outline"}
              size="sm"
              onClick={onFavorite}
              className={`px-3 ${isFavorited ? 'bg-red-500 hover:bg-red-600' : ''}`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
