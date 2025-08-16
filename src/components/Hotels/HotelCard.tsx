import React from 'react';
import { Star, MapPin, Wifi, Car, Utensils, Coffee, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Hotel } from '../../store/useStore';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const {
    name,
    location,
    city,
    country,
    stars,
    pricePerNight,
    currency,
    images,
    amenities,
    roomTypes,
    reviews,
    checkInTime,
    checkOutTime,
    description,
    availability
  } = hotel;

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
      case 'wi-fi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'restaurant':
        return <Utensils className="h-4 w-4" />;
      case 'bar':
      case 'café':
        return <Coffee className="h-4 w-4" />;
      default:
        return <div className="h-4 w-4 bg-primary rounded-full" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? 'text-amber-400 fill-amber-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="hover:shadow-competitive transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {name}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {renderStars(stars)}
              </div>
              <Badge className="bg-primary/10 text-primary">
                {stars} étoiles
              </Badge>
              {availability ? (
                <Badge className="bg-green-100 text-green-800">
                  Disponible
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">
                  Complet
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{location}, {city}, {country}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Image placeholder */}
        <div className="w-full h-48 gradient-primary rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">Image d'hôtel</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>

        {/* Price */}
        <div className="bg-primary/10 rounded-lg p-3">
          <div className="text-xs text-primary uppercase tracking-wide mb-1">Prix par nuit</div>
          <div className="text-2xl font-bold text-primary">
            {pricePerNight} {currency}
          </div>
        </div>

        {/* Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {renderStars(Math.round(reviews.rating))}
          </div>
          <span className="text-sm text-gray-600">
            {reviews.rating.toFixed(1)} ({reviews.totalReviews} avis)
          </span>
        </div>

        {/* Check-in/out times */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">Arrivée</div>
            <div className="text-sm font-semibold text-gray-900 flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {checkInTime}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">Départ</div>
            <div className="text-sm font-semibold text-gray-900 flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {checkOutTime}
            </div>
          </div>
        </div>

        {/* Room types */}
        {roomTypes.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Types de chambres</h4>
            <div className="space-y-2">
              {roomTypes.slice(0, 2).map((room, index) => (
                <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{room.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{room.price} {currency}</span>
                    <Badge variant={room.available ? "default" : "destructive"} className="text-xs">
                      {room.available ? 'Disponible' : 'Indisponible'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        {amenities.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Équipements</h4>
            <div className="flex flex-wrap gap-2">
              {amenities.slice(0, 4).map((amenity, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1 text-xs">
                  {getAmenityIcon(amenity)}
                  {amenity}
                </Badge>
              ))}
              {amenities.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{amenities.length - 4} autres
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t">
          <Button variant="outline" size="sm">
            Voir détails
          </Button>
          <Button className="gradient-primary text-white" size="sm">
            Comparer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;