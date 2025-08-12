import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import CompetitorCard from '../components/Competitors/CompetitorCard';
import SearchFilters from '../components/Competitors/SearchFilters';
import HotelCard from '../components/Hotels/HotelCard';
import HotelSearchFilters from '../components/Hotels/HotelSearchFilters';
import RecommendationsSection from '../components/Dashboard/RecommendationsSection';

const Index = () => {
  const { 
    isAuthenticated, 
    competitors, 
    filteredCompetitors, 
    setCompetitors,
    hotels,
    filteredHotels,
    setHotels
  } = useStore();

  useEffect(() => {
    // Mock data for competitors
    const mockCompetitors = [
      {
        id: '1',
        name: 'Booking.com',
        type: 'booking' as const,
        lastUpdated: '2024-01-15',
        metrics: {
          averagePrice: 450,
          totalOffers: 15420,
          priceChange: -2.3,
          marketShare: 35.2,
        },
        recentActivity: {
          priceChanges: [
            {
              product: 'Hôtel Laico Tunis',
              oldPrice: 520,
              newPrice: 480,
              changePercent: -7.7,
              date: '2024-01-15',
            },
            {
              product: 'Four Seasons Tunis',
              oldPrice: 850,
              newPrice: 920,
              changePercent: 8.2,
              date: '2024-01-14',
            },
          ],
          promotions: [
            {
              title: 'Réservez maintenant, payez plus tard',
              discount: 15,
              validUntil: '2024-02-15',
              products: ['Hôtels 4 étoiles'],
            },
          ],
        },
        website: 'https://booking.com',
        country: 'Tunisie',
        status: 'active' as const,
      },
      {
        id: '2',
        name: 'Tunisie Booking',
        type: 'tunisie-booking' as const,
        lastUpdated: '2024-01-15',
        metrics: {
          averagePrice: 320,
          totalOffers: 8900,
          priceChange: 1.8,
          marketShare: 28.7,
        },
        recentActivity: {
          priceChanges: [
            {
              product: 'Resort Hammamet',
              oldPrice: 280,
              newPrice: 300,
              changePercent: 7.1,
              date: '2024-01-15',
            },
          ],
          promotions: [
            {
              title: 'Offre spéciale Ramadan',
              discount: 25,
              validUntil: '2024-04-15',
              products: ['Hôtels familiaux'],
            },
          ],
        },
        website: 'https://tunisiebooking.com',
        country: 'Tunisie',
        status: 'active' as const,
      },
      {
        id: '3',
        name: 'TravelToDo',
        type: 'traveltodo' as const,
        lastUpdated: '2024-01-14',
        metrics: {
          averagePrice: 380,
          totalOffers: 6200,
          priceChange: -0.5,
          marketShare: 22.1,
        },
        recentActivity: {
          priceChanges: [],
          promotions: [
            {
              title: 'Été 2024 anticipé',
              discount: 30,
              validUntil: '2024-03-31',
              products: ['Forfaits plage'],
            },
          ],
        },
        website: 'https://traveltodo.com',
        country: 'Tunisie',
        status: 'monitoring' as const,
      },
    ];

    setCompetitors(mockCompetitors);

    // Mock data for hotels
    const mockHotels = [
      {
        id: '1',
        name: 'Hôtel Laico Tunis',
        location: 'Avenue Habib Bourguiba',
        city: 'Tunis',
        country: 'Tunisie',
        stars: 5,
        pricePerNight: 480,
        currency: 'TND',
        images: [],
        amenities: ['Wi-Fi', 'Piscine', 'Restaurant', 'Spa', 'Parking'],
        roomTypes: [
          { type: 'Chambre Standard', price: 480, available: true },
          { type: 'Suite Executive', price: 750, available: false },
        ],
        reviews: { rating: 4.3, totalReviews: 1240 },
        coordinates: { lat: 36.8065, lng: 10.1815 },
        checkInTime: '15:00',
        checkOutTime: '12:00',
        cancellationPolicy: 'Annulation gratuite jusqu\'à 24h avant',
        description: 'Hôtel de luxe situé au cœur de Tunis avec vue sur la mer Méditerranée.',
        availability: true,
        lastUpdated: '2024-01-15',
      },
      {
        id: '2',
        name: 'Four Seasons Tunis',
        location: 'Gammarth',
        city: 'Tunis',
        country: 'Tunisie',
        stars: 5,
        pricePerNight: 920,
        currency: 'TND',
        images: [],
        amenities: ['Wi-Fi', 'Piscine', 'Restaurant', 'Spa', 'Salle de sport', 'Bar'],
        roomTypes: [
          { type: 'Chambre Deluxe', price: 920, available: true },
          { type: 'Suite Présidentielle', price: 1500, available: true },
        ],
        reviews: { rating: 4.8, totalReviews: 850 },
        coordinates: { lat: 36.8783, lng: 10.3258 },
        checkInTime: '15:00',
        checkOutTime: '12:00',
        cancellationPolicy: 'Annulation gratuite jusqu\'à 48h avant',
        description: 'Resort de luxe avec plage privée et services haut de gamme.',
        availability: true,
        lastUpdated: '2024-01-15',
      },
      {
        id: '3',
        name: 'Hôtel Movenpick Sousse',
        location: 'Port El Kantaoui',
        city: 'Sousse',
        country: 'Tunisie',
        stars: 4,
        pricePerNight: 320,
        currency: 'TND',
        images: [],
        amenities: ['Wi-Fi', 'Piscine', 'Restaurant', 'Parking', 'Climatisation'],
        roomTypes: [
          { type: 'Chambre Vue Mer', price: 320, available: true },
          { type: 'Suite Junior', price: 450, available: false },
        ],
        reviews: { rating: 4.1, totalReviews: 620 },
        coordinates: { lat: 35.8256, lng: 10.5965 },
        checkInTime: '14:00',
        checkOutTime: '12:00',
        cancellationPolicy: 'Annulation gratuite jusqu\'à 24h avant',
        description: 'Hôtel familial avec accès direct à la plage et animations.',
        availability: true,
        lastUpdated: '2024-01-14',
      },
      {
        id: '4',
        name: 'Iberostar Djerba',
        location: 'Zone Touristique Midoun',
        city: 'Djerba',
        country: 'Tunisie',
        stars: 4,
        pricePerNight: 280,
        currency: 'TND',
        images: [],
        amenities: ['Wi-Fi', 'Piscine', 'Restaurant', 'Animation', 'Tennis', 'Spa'],
        roomTypes: [
          { type: 'Chambre Double', price: 280, available: true },
          { type: 'Chambre Familiale', price: 380, available: true },
        ],
        reviews: { rating: 4.2, totalReviews: 890 },
        coordinates: { lat: 33.8076, lng: 10.7576 },
        checkInTime: '15:00',
        checkOutTime: '12:00',
        cancellationPolicy: 'Annulation gratuite jusqu\'à 72h avant',
        description: 'Resort tout inclus sur l\'île de Djerba avec animations pour toute la famille.',
        availability: true,
        lastUpdated: '2024-01-14',
      },
      {
        id: '5',
        name: 'Villa Didon Sidi Bou Saïd',
        location: 'Sidi Bou Saïd',
        city: 'Tunis',
        country: 'Tunisie',
        stars: 5,
        pricePerNight: 650,
        currency: 'TND',
        images: [],
        amenities: ['Wi-Fi', 'Piscine', 'Restaurant', 'Spa', 'Vue Mer', 'Parking'],
        roomTypes: [
          { type: 'Chambre Supérieure', price: 650, available: false },
          { type: 'Suite Vue Mer', price: 950, available: true },
        ],
        reviews: { rating: 4.6, totalReviews: 450 },
        coordinates: { lat: 36.8687, lng: 10.3470 },
        checkInTime: '15:00',
        checkOutTime: '11:00',
        cancellationPolicy: 'Annulation gratuite jusqu\'à 48h avant',
        description: 'Hôtel boutique de charme avec vue panoramique sur le golfe de Tunis.',
        availability: false,
        lastUpdated: '2024-01-13',
      },
    ];

    setHotels(mockHotels);
  }, [setCompetitors, setHotels]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-competitive via-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Medina - Intelligence Concurrentielle Hôtelière
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Comparez les hôtels et surveillez vos concurrents en temps réel pour prendre des décisions stratégiques
          </p>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="hotels" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="hotels">Comparaison Hôtels</TabsTrigger>
            <TabsTrigger value="competitors">Analyse Concurrents</TabsTrigger>
          </TabsList>

          <TabsContent value="hotels" className="space-y-6">
            {/* Hotel Search & Filters */}
            <HotelSearchFilters />

            {/* Stats Cards for Hotels */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-competitive">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Hôtels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {hotels.length}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Dans la base
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {hotels.filter(h => h.availability).length}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Réservables
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Prix Moyen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round(hotels.reduce((acc, h) => acc + h.pricePerNight, 0) / hotels.length || 0)} TND
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Par nuit
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Note Moyenne
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {(hotels.reduce((acc, h) => acc + h.reviews.rating, 0) / hotels.length || 0).toFixed(1)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Sur 5 étoiles
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Hotels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard 
                  key={hotel.id} 
                  hotel={hotel} 
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="competitors" className="space-y-6">
            {/* Competitor Search & Filters */}
            <SearchFilters />

            {/* Stats Cards for Competitors */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-competitive">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Concurrents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {competitors.length}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Surveillés activement
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Concurrents Actifs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {competitors.filter(c => c.status === 'active').length}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    En temps réel
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Changements Prix
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    24
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Dernières 24h
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Alertes Actives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    7
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Nécessitent action
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Competitors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCompetitors.map((competitor) => (
                <CompetitorCard 
                  key={competitor.id} 
                  competitor={competitor} 
                />
              ))}
            </div>

            {/* Recommendations */}
            <RecommendationsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;