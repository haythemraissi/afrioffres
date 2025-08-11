import React from 'react';
import { TrendingUp, TrendingDown, Globe, AlertTriangle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { CompetitorData } from '../../store/useStore';

interface CompetitorCardProps {
  competitor: CompetitorData;
}

const CompetitorCard: React.FC<CompetitorCardProps> = ({ competitor }) => {
  const { name, type, metrics, recentActivity, website, country, status, lastUpdated } = competitor;
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'bg-blue-100 text-blue-800';
      case 'tunisie-booking': return 'bg-green-100 text-green-800';
      case 'traveltodo': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-competitive transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
              {name}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getTypeColor(type)}>
                {type.replace('-', ' ')}
              </Badge>
              <Badge className={getStatusColor(status)}>
                {status}
              </Badge>
              <span className="text-sm text-gray-500">{country}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {new Date(lastUpdated).toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">Prix moyen</div>
            <div className="text-lg font-semibold text-gray-900">
              {metrics.averagePrice.toFixed(0)} TND
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">Offres totales</div>
            <div className="text-lg font-semibold text-gray-900">
              {metrics.totalOffers.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">Part de marché</div>
            <div className="text-lg font-semibold text-gray-900">
              {metrics.marketShare.toFixed(1)}%
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">Évolution prix</div>
            <div className={`text-lg font-semibold flex items-center gap-1 ${
              metrics.priceChange > 0 ? 'text-red-600' : 
              metrics.priceChange < 0 ? 'text-green-600' : 'text-gray-900'
            }`}>
              {metrics.priceChange > 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : metrics.priceChange < 0 ? (
                <TrendingDown className="h-4 w-4" />
              ) : null}
              {Math.abs(metrics.priceChange).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        {recentActivity.priceChanges.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Changements récents</h4>
            <div className="space-y-2">
              {recentActivity.priceChanges.slice(0, 2).map((change, index) => (
                <div key={index} className="flex items-center justify-between text-sm bg-yellow-50 p-2 rounded">
                  <span className="text-gray-700">{change.product}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{change.oldPrice} → {change.newPrice} TND</span>
                    <Badge variant={change.changePercent > 0 ? "destructive" : "default"} className="text-xs">
                      {change.changePercent > 0 ? '+' : ''}{change.changePercent.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Promotions */}
        {recentActivity.promotions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Promotions actives</h4>
            <div className="space-y-2">
              {recentActivity.promotions.slice(0, 2).map((promo, index) => (
                <div key={index} className="flex items-center justify-between text-sm bg-green-50 p-2 rounded">
                  <span className="text-gray-700">{promo.title}</span>
                  <Badge className="bg-green-100 text-green-800">
                    -{promo.discount}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t">
          <Button variant="outline" size="sm" asChild>
            <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              Visiter
            </a>
          </Button>
          
          <Button variant="default" size="sm" className="gradient-primary text-white">
            Analyser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorCard;