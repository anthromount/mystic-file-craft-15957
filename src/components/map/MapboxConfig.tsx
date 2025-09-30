import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const MAPBOX_TOKEN_KEY = 'mapbox_access_token';

export const useMapboxToken = () => {
  const [token, setToken] = useState<string>('');
  
  useEffect(() => {
    const stored = localStorage.getItem(MAPBOX_TOKEN_KEY);
    if (stored) setToken(stored);
  }, []);
  
  const saveToken = (newToken: string) => {
    localStorage.setItem(MAPBOX_TOKEN_KEY, newToken);
    setToken(newToken);
  };
  
  return { token, saveToken };
};

export const MapboxTokenInput = () => {
  const { token, saveToken } = useMapboxToken();
  const [input, setInput] = useState(token);
  
  useEffect(() => {
    setInput(token);
  }, [token]);
  
  const handleBlur = () => {
    if (input !== token) {
      saveToken(input);
      window.location.reload();
    }
  };
  
  return (
    <div className="space-y-3">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Enter your Mapbox public token to enable interactive maps. Get one free at{' '}
          <a 
            href="https://account.mapbox.com/access-tokens/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline font-medium"
          >
            mapbox.com
          </a>
        </AlertDescription>
      </Alert>
      
      <div className="space-y-2">
        <Label htmlFor="mapbox-token" className="text-sm">Mapbox Access Token</Label>
        <Input
          id="mapbox-token"
          type="text"
          placeholder="pk.eyJ1Ijo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={handleBlur}
          className="font-mono text-xs"
        />
      </div>
    </div>
  );
};
