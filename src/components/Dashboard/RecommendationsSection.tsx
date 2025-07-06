
import React from 'react';
import { Sparkles, TrendingUp, Target, Star, Zap, Crown } from 'lucide-react';
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
      <Card className="mb-8 border-0 shadow-xl bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full -mr-16 -mt-16 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200 to-orange-200 rounded-full -ml-12 -mb-12 opacity-30"></div>
        
        <CardHeader className="text-center relative z-10">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl relative">
            <Sparkles className="h-8 w-8 text-white animate-pulse" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Crown className="h-3 w-3 text-yellow-700" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
            Recommandations IA Premium
          </CardTitle>
          <p className="text-gray-600 mt-2">Intelligence artificielle avancée pour votre succès</p>
        </CardHeader>
        
        <CardContent className="text-center space-y-6 relative z-10">
          <p className="text-gray-700 text-lg leading-relaxed">
            Découvrez des appels d'offres parfaitement adaptés à votre profil grâce à notre IA de dernière génération
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="flex flex-col items-center space-y-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800">Ciblage Précis</h3>
                <p className="text-sm text-gray-600">Algorithmes avancés</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800">Analyse Prédictive</h3>
                <p className="text-sm text-gray-600">Tendances du marché</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800">Temps Réel</h3>
                <p className="text-sm text-gray-600">Mises à jour instantanées</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg font-semibold">
              <Crown className="h-5 w-5 mr-2" />
              Passer au Premium
            </Button>
            <Button variant="outline" className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 px-6 py-3">
              Voir les tarifs
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Recommandé pour vous
            </h2>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              Personnalisé par IA
            </p>
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50">
          <Target className="h-4 w-4 mr-2" />
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
        <Card className="text-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-lg">
          <CardContent className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Configurez vos préférences
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Renseignez vos pays et secteurs d'intérêt pour recevoir des recommandations sur mesure
            </p>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6">
              <Target className="h-4 w-4 mr-2" />
              Configurer maintenant
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecommendationsSection;
