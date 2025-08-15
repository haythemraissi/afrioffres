import React from 'react';
import { TrendingDown, Sparkles, Hotel, Star, MapPin, Crown } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const HotelRecommendationsSection = () => {
  const { user, hotels } = useStore();

  if (!user || user.role === 'free') {
    return (
      <Card className="mb-8 border-0 shadow-xl gradient-primary text-white overflow-hidden relative">
        <CardHeader className="text-center relative z-10">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
            <Hotel className="h-8 w-8 text-white animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Recommandations Hôtels Premium
          </CardTitle>
          <p className="text-white/80 mt-2">Intelligence artificielle pour les meilleures opportunités</p>
        </CardHeader>
        
        <CardContent className="text-center space-y-6 relative z-10">
          <p className="text-white/90 text-lg leading-relaxed">
            Accédez aux recommandations d'hôtels à bas prix et aux analyses tarifaires avancées
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

  // Filtrer les hôtels par prix croissant et prendre les 3 moins chers
  const budgetHotels = hotels
    .sort((a, b) => a.pricePerNight - b.pricePerNight)
    .slice(0, 3);

  return (
    <div className="mb-8">
      <Card className="shadow-competitive border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient">
            <TrendingDown className="h-5 w-5 text-success" />
            Recommandations - Meilleurs prix
          </CardTitle>
          <p className="text-gray-600">Hôtels recommandés pour leur excellent rapport qualité-prix</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgetHotels.map((hotel, index) => (
              <div key={hotel.id} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs">
                      {index === 0 ? "Meilleur prix" : `#${index + 1} Prix`}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {[...Array(hotel.stars)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2">{hotel.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <MapPin className="h-3 w-3" />
                  {hotel.city}, {hotel.country}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">
                    {hotel.pricePerNight} {hotel.currency}
                    <span className="text-sm text-gray-500 font-normal">/nuit</span>
                  </div>
                  <Badge variant="outline" className="text-success border-success">
                    -{Math.round((1 - hotel.pricePerNight / Math.max(...hotels.map(h => h.pricePerNight))) * 100)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-success" />
              <span className="font-medium text-gray-900">Tendance tarifaire</span>
            </div>
            <p className="text-sm text-gray-600">
              Les prix moyens ont baissé de 8% cette semaine. C'est le moment idéal pour réserver !
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelRecommendationsSection;