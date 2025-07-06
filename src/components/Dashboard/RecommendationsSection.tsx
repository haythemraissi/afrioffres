
import React from 'react';
import { Sparkles, TrendingUp, Target } from 'lucide-react';
import { useStore } from '../../store/useStore';
import TenderCard from './TenderCard';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const RecommendationsSection = () => {
  const { user, tenders } = useStore();

  // Simulate AI recommendations based on user preferences
  const getRecommendations = () => {
    if (!user) return [];
    
    const userCountries = user.preferences.countries;
    const userSectors = user.preferences.sectors;
    const userKeywords = user.keywords;

    return tenders
      .filter(tender => {
        // Match by country
        const countryMatch = userCountries.length === 0 || userCountries.includes(tender.country);
        
        // Match by sector
        const sectorMatch = userSectors.length === 0 || userSectors.includes(tender.sector);
        
        // Match by keywords
        const keywordMatch = userKeywords.length === 0 || userKeywords.some(keyword =>
          tender.title.toLowerCase().includes(keyword.toLowerCase()) ||
          tender.description.toLowerCase().includes(keyword.toLowerCase())
        );

        return countryMatch && sectorMatch && keywordMatch;
      })
      .slice(0, 6);
  };

  const recommendations = getRecommendations();

  if (!user || user.role === 'free') {
    return (
      <Card className="mb-6 border-2 border-dashed border-orange-300 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-xl">Recommandations IA Personnalisées</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Découvrez des appels d'offres parfaitement adaptés à votre profil grâce à notre intelligence artificielle avancée.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-orange-500" />
              <span className="text-sm">Ciblage précis</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <span className="text-sm">Analyse prédictive</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-orange-500" />
              <span className="text-sm">Mise à jour temps réel</span>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8">
            Passer au Premium
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Recommandations pour vous</h2>
        <Button variant="outline" size="sm">
          Personnaliser
        </Button>
      </div>

      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map(tender => (
            <TenderCard key={tender.id} tender={tender} />
          ))}
        </div>
      ) : (
        <Card className="text-center p-8">
          <CardContent>
            <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Configurez vos préférences
            </h3>
            <p className="text-gray-600 mb-4">
              Renseignez vos pays et secteurs d'intérêt pour recevoir des recommandations personnalisées.
            </p>
            <Button variant="outline">
              Configurer maintenant
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecommendationsSection;
