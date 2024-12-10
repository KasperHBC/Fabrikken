// src/Statistics.js
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase.js';
import { FaCheckCircle, FaCog } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Funktion til at beregne næste produktions tid for et produkt
const calculateNextProductionTime = (lastProducedAt, intervalMinutes) => {
  if (!lastProducedAt) return 'Ingen data';

  const lastProducedDate = lastProducedAt.toDate();
  const nextProduction = new Date(lastProducedDate.getTime() + intervalMinutes * 60000);

  // Definer tidsrammen: 06:30 - 15:00
  const startHour = 6;
  const startMinute = 30;
  const endHour = 15;
  const endMinute = 0;

  // Justér næste produktionstidspunkt, hvis det falder udenfor tidsrammen
  if (
    nextProduction.getHours() < startHour ||
    (nextProduction.getHours() === startHour && nextProduction.getMinutes() < startMinute)
  ) {
    nextProduction.setHours(startHour, startMinute, 0, 0);
  } else if (
    nextProduction.getHours() > endHour ||
    (nextProduction.getHours() === endHour && nextProduction.getMinutes() > endMinute)
  ) {
    // Sæt næste produktion til i morgen kl. 06:30
    nextProduction.setDate(nextProduction.getDate() + 1);
    nextProduction.setHours(startHour, startMinute, 0, 0);
  }

  return nextProduction.toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const Statistics = () => {
  const [productStats, setProductStats] = useState([]);
  const [nextProductionTimes, setNextProductionTimes] = useState({});

  useEffect(() => {
    // Real-time listener for stats collection
    const unsubscribeStats = onSnapshot(collection(db, 'stats'), (snapshot) => {
      const stats = [];
      const productionTimes = {};
      snapshot.forEach((doc) => {
        if (doc.id.startsWith('product')) { // Kun håndter produkt dokumenter
          const data = doc.data();
          stats.push({
            id: doc.id,
            name: `Produkt ${doc.id.replace('product', '')}`,
            soldCount: data.soldCount || 0,
            producedCount: data.producedCount || 0,
            stock: data.stock || 0,
            productionIntervalMinutes: data.productionIntervalMinutes || 60,
            lastProducedAt: data.lastProducedAt || null,
          });

          // Beregn næste produktionstidspunkt
          const nextProduction = calculateNextProductionTime(data.lastProducedAt, data.productionIntervalMinutes);
          productionTimes[doc.id] = nextProduction;
        }
      });
      setProductStats(stats);
      setNextProductionTimes(productionTimes);
    }, (error) => {
      console.error('Fejl ved real-time opdatering af stats:', error);
      toast.error('Fejl ved opdatering af statistikker.');
    });

    return () => {
      unsubscribeStats();
    };
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Solgte Produkter Statistik */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Solgte Produkter</h3>
        <ul>
          {productStats.map((product) => (
            <li key={product.id} className="flex items-center mb-2">
              <FaCheckCircle className="text-green-500 mr-2" />
              <span>{product.name}: {product.soldCount} solgt</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Lagerbeholdning Statistik */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Lagerbeholdning</h3>
        <ul>
          {productStats.map((product) => (
            <li key={product.id} className="flex items-center mb-2">
              <FaCog className="text-yellow-500 mr-2" />
              <span>{product.name}: {product.stock} på lager</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Producerede Enheder Statistik */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Producerede Enheder</h3>
        <ul>
          {productStats.map((product) => (
            <li key={product.id} className="flex items-center mb-2">
              <FaCog className="text-blue-500 mr-2" />
              <span>{product.name}: {product.producedCount} produceret</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;
