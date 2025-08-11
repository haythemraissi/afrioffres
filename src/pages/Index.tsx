import React, { useEffect, useState } from 'react';
import { useStore, CompetitorData } from '../store/useStore';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import CompetitorCard from '../components/Competitors/CompetitorCard';
import SearchFilters from '../components/Competitors/SearchFilters';
import RecommendationsSection from '../components/Dashboard/RecommendationsSection';
import AIAssistant from '../components/AIAssistant/AIAssistant';
import Chatbot from '../components/Chatbot/Chatbot';
import AuthModal from '../components/Auth/AuthModal';

const Index = () => {
  const {
    currentPage,
    filteredCompetitors,
    setCompetitors,
    isAuthenticated,
    addNotification,
  } = useStore();

  const [showAuthModal, setShowAuthModal] = useState(false);

  // Mock data for competitive intelligence
  const mockCompetitors: CompetitorData[] = [
    {
      id: '1',
      name: 'Booking.com',
      type: 'booking',
      lastUpdated: '2024-01-15',
      metrics: {
        averagePrice: 150,
        totalOffers: 12500,
        priceChange: -2.5,
        marketShare: 35.2,
      },
      recentActivity: {
        priceChanges: [
          {
            product: 'Hôtel Sidi Bou Saïd',
            oldPrice: 180,
            newPrice: 165,
            changePercent: -8.3,
            date: '2024-01-15',
          },
          {
            product: 'Resort Hammamet',
            oldPrice: 220,
            newPrice: 210,
            changePercent: -4.5,
            date: '2024-01-14',
          },
        ],
        promotions: [
          {
            title: 'Réservez 3 nuits, payez 2',
            discount: 33,
            validUntil: '2024-02-15',
            products: ['Hôtels de luxe'],
          },
        ],
      },
      website: 'https://booking.com',
      country: 'Tunisie',
      status: 'active',
    },
    {
      id: '2',
      name: 'Tunisie Booking',
      type: 'tunisie-booking',
      lastUpdated: '2024-01-15',
      metrics: {
        averagePrice: 120,
        totalOffers: 8200,
        priceChange: 1.8,
        marketShare: 28.7,
      },
      recentActivity: {
        priceChanges: [
          {
            product: 'Hôtel Djerba',
            oldPrice: 95,
            newPrice: 105,
            changePercent: 10.5,
            date: '2024-01-15',
          },
        ],
        promotions: [
          {
            title: 'Offre spéciale weekend',
            discount: 20,
            validUntil: '2024-01-30',
            products: ['Hôtels weekend'],
          },
        ],
      },
      website: 'https://tunisiebooking.com',
      country: 'Tunisie',
      status: 'active',
    },
    {
      id: '3',
      name: 'TravelToDo',
      type: 'traveltodo',
      lastUpdated: '2024-01-14',
      metrics: {
        averagePrice: 135,
        totalOffers: 6800,
        priceChange: -0.5,
        marketShare: 22.1,
      },
      recentActivity: {
        priceChanges: [],
        promotions: [
          {
            title: 'Été anticipé -25%',
            discount: 25,
            validUntil: '2024-03-31',
            products: ['Forfaits été'],
          },
        ],
      },
      website: 'https://traveltodo.com',
      country: 'Tunisie',
      status: 'monitoring',
    },
  ];

  useEffect(() => {
    setCompetitors(mockCompetitors);
    
    // Add sample notifications
    addNotification({
      title: 'Alerte prix',
      message: 'Booking.com a réduit ses prix de 8.3% sur les hôtels de Sidi Bou Saïd',
      type: 'price-change',
      severity: 'medium',
    });

    addNotification({
      title: 'Nouvelle promotion',
      message: 'TravelToDo lance une offre "Été anticipé" avec -25% de réduction',
      type: 'promotion',
      severity: 'low',
    });

    addNotification({
      title: 'Anomalie détectée',
      message: 'Augmentation inhabituelle des prix chez Tunisie Booking (+10.5%)',
      type: 'anomaly',
      severity: 'high',
    });
  }, [setCompetitors, addNotification]);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setShowAuthModal(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                Tableau de bord concurrentiel
              </h2>
            </div>
            
            <RecommendationsSection />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompetitors.map((competitor) => (
                <CompetitorCard key={competitor.id} competitor={competitor} />
              ))}
            </div>
          </div>
        );

      case 'competitors':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                Analyses concurrentielles
              </h2>
            </div>
            
            <SearchFilters />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompetitors.map((competitor) => (
                <CompetitorCard key={competitor.id} competitor={competitor} />
              ))}
            </div>
          </div>
        );

      case 'ai-assistant':
        return <AIAssistant />;

      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Alertes et notifications</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Gestion des alertes en temps réel pour les changements concurrentiels</p>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Statistiques et analyses</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Graphiques et analyses détaillées de la concurrence</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Paramètres</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Configuration de la plateforme</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Tableau de bord</h2>
            <RecommendationsSection />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-0 p-6">
          {renderCurrentPage()}
        </main>
      </div>
      <Chatbot />
      {showAuthModal && (
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default Index;