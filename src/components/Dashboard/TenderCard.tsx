
import React from 'react';
import { Calendar, MapPin, Building, DollarSign, Clock, AlertCircle, Bookmark, Share2, TrendingUp } from 'lucide-react';
import { Tender } from '../../store/useStore';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

interface TenderCardProps {
  tender: Tender;
}

const TenderCard: React.FC<TenderCardProps> = ({ tender }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'awarded':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'Ouvert';
      case 'closed':
        return 'Fermé';
      case 'awarded':
        return 'Attribué';
      default:
        return status;
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(tender.deadline);
  const isUrgent = daysRemaining <= 7 && daysRemaining > 0;

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white shadow-lg hover:-translate-y-1 relative overflow-hidden">
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
      <div className="absolute inset-[1px] bg-white rounded-lg"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-3">
            <Badge className={`${getStatusColor(tender.status)} shadow-sm`}>
              {getStatusLabel(tender.status)}
            </Badge>
            <div className="flex items-center gap-2">
              {isUrgent && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white flex items-center gap-1 animate-pulse">
                  <AlertCircle className="h-3 w-3" />
                  Urgent
                </Badge>
              )}
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {tender.title}
          </h3>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center text-gray-600 text-sm bg-gray-50 rounded-lg p-2">
            <Building className="h-4 w-4 mr-2 flex-shrink-0 text-orange-500" />
            <span className="truncate font-medium">{tender.organization}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
              <span className="truncate">{tender.country}</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-400 mr-2"></div>
              <span className="text-orange-600 font-semibold">{tender.sector}</span>
            </div>
          </div>

          <div className="flex items-center text-gray-700 text-sm bg-green-50 rounded-lg p-2">
            <DollarSign className="h-4 w-4 mr-2 flex-shrink-0 text-green-600" />
            <span className="font-bold text-green-700">{tender.budget}</span>
            <TrendingUp className="h-3 w-3 ml-2 text-green-500" />
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0 text-purple-500" />
            <span>Échéance: {new Date(tender.deadline).toLocaleDateString('fr-FR')}</span>
          </div>

          {daysRemaining > 0 && (
            <div className={`flex items-center text-sm px-3 py-2 rounded-full ${isUrgent ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="font-medium">
                {daysRemaining === 1 ? '1 jour restant' : `${daysRemaining} jours restants`}
              </span>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
              {tender.description}
            </p>
          </div>

          {tender.requirements.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Exigences clés</p>
              <div className="flex flex-wrap gap-2">
                {tender.requirements.slice(0, 3).map((req, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-white border-orange-200 text-orange-700 hover:bg-orange-50">
                    {req}
                  </Badge>
                ))}
                {tender.requirements.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 text-orange-600">
                    +{tender.requirements.length - 3} autres
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex gap-2 pt-4">
          <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
            Voir détails
          </Button>
          <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-colors">
            <Bookmark className="h-4 w-4" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default TenderCard;
