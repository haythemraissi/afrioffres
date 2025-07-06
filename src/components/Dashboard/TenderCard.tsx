
import React from 'react';
import { Calendar, MapPin, Building, DollarSign, Clock, AlertCircle } from 'lucide-react';
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
        return 'bg-green-100 text-green-800 border-green-200';
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
    <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getStatusColor(tender.status)}>
            {getStatusLabel(tender.status)}
          </Badge>
          {isUrgent && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Urgent
            </Badge>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {tender.title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-gray-600 text-sm">
          <Building className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">{tender.organization}</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{tender.country}</span>
          <span className="mx-2">•</span>
          <span className="text-orange-600 font-medium">{tender.sector}</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="font-medium">{tender.budget}</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>Échéance: {new Date(tender.deadline).toLocaleDateString('fr-FR')}</span>
        </div>

        {daysRemaining > 0 && (
          <div className={`flex items-center text-sm ${isUrgent ? 'text-red-600' : 'text-green-600'}`}>
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>
              {daysRemaining === 1 ? '1 jour restant' : `${daysRemaining} jours restants`}
            </span>
          </div>
        )}

        <p className="text-gray-700 text-sm line-clamp-3">
          {tender.description}
        </p>

        {tender.requirements.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-600">Exigences clés:</p>
            <div className="flex flex-wrap gap-1">
              {tender.requirements.slice(0, 3).map((req, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {req}
                </Badge>
              ))}
              {tender.requirements.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tender.requirements.length - 3} autres
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-3">
        <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
          Voir détails
        </Button>
        <Button variant="outline" className="flex-1">
          Sauvegarder
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TenderCard;
