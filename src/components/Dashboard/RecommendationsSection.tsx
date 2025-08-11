import React from 'react';
import { Sparkles, TrendingUp, Target, Star, Crown, BarChart3 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const RecommendationsSection = () => {
  const { user, competitors } = useStore();

  if (!user || user.role === 'free') {
    return (
      <Card className="mb-8 border-0 shadow-xl gradient-primary text-white overflow-hidden relative">
        <CardHeader className="text-center relative z-10">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
            <BarChart3 className="h-8 w-8 text-white animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Analyses Concurrentielles Premium
          </CardTitle>
          <p className="text-white/80 mt-2">Intelligence artificielle pour la veille concurrentielle</p>
        </CardHeader>
        
        <CardContent className="text-center space-y-6 relative z-10">
          <p className="text-white/90 text-lg leading-relaxed">
            Accédez aux analyses avancées, alertes en temps réel et prédictions de marché
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 shadow-xl">
              <Crown className="h-5 w-5 mr-2" />
              Passer au Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mb-8">
      <Card className="shadow-competitive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient">
            <Sparkles className="h-5 w-5" />
            Aperçu concurrentiel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{competitors.length}</div>
              <div className="text-sm text-gray-600">Concurrents suivis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">3</div>
              <div className="text-sm text-gray-600">Alertes actives</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">+5.2%</div>
              <div className="text-sm text-gray-600">Évolution marché</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendationsSection;