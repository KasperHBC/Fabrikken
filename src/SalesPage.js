// src/SalesPage.js
import React, { useEffect, useState } from 'react';
import Layout from './Layout.js';
import Hero from './Hero.js';
import Section from './Section.js';
import { FaShoppingCart, FaClock } from 'react-icons/fa';
import { addDoc, collection, serverTimestamp, doc, writeBatch, getDoc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase.js';
import HeroVideoSales from './assets/videos/sales-hero-video.mp4'; 
import { toast } from 'react-toastify';
import DefultImage from './assets/images/ArduinoUno-thumbnail.jpg'; 

const products = [
  {
    id: 1,
    name: 'Produkt 1',
    description: 'Beskrivelse af Produkt 1',
    price: 100,
    //image: '/assets/images/product1.jpg', // Sti til produktbillede
  },
  {
    id: 2,
    name: 'Produkt 2',
    description: 'Beskrivelse af Produkt 2',
    price: 150,
    //image: '/assets/images/product2.jpg',
  },
  {
    id: 3,
    name: 'Produkt 3',
    description: 'Beskrivelse af Produkt 3',
    price: 200,
    // Ingen billede angivet, bruger standardbillede
  },
  {
    id: 4,
    name: 'Produkt 4',
    description: 'Beskrivelse af Produkt 4',
    price: 250,
    //image: '/assets/images/product4.jpg',
  },
  {
    id: 5,
    name: 'Produkt 5',
    description: 'Beskrivelse af Produkt 5',
    price: 300,
    //image: '/assets/images/product5.jpg',
  },
  {
    id: 6,
    name: 'Produkt 6',
    description: 'Beskrivelse af Produkt 6',
    price: 350,
    // Ingen billede angivet, bruger standardbillede
  },
];

const defaultImage = DefultImage; // Sti til standardbillede

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
  if (nextProduction.getHours() < startHour || 
      (nextProduction.getHours() === startHour && nextProduction.getMinutes() < startMinute)) {
    nextProduction.setHours(startHour, startMinute, 0, 0);
  } else if (nextProduction.getHours() > endHour || 
             (nextProduction.getHours() === endHour && nextProduction.getMinutes() > endMinute)) {
    // Næste produktion er i morgen kl. 06:30
    nextProduction.setDate(nextProduction.getDate() + 1);
    nextProduction.setHours(startHour, startMinute, 0, 0);
  }

  return nextProduction.toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const SalesPage = () => {
  const [productStats, setProductStats] = useState({});
  const [recentPurchases, setRecentPurchases] = useState([]);

  useEffect(() => {
    // Real-time listener for stats collection
    const unsubscribeStats = onSnapshot(collection(db, 'stats'), (snapshot) => {
      const stats = {};
      snapshot.forEach((doc) => {
        if (doc.id.startsWith('product')) {
          stats[doc.id] = doc.data();
        }
      });
      setProductStats(stats);
    }, (error) => {
      console.error('Fejl ved real-time opdatering af stats:', error);
      toast.error('Fejl ved opdatering af statistikker.');
    });

    // Real-time listener for recent purchases
    const recentPurchasesQuery = query(
      collection(db, 'purchases'),
      orderBy('timestamp', 'desc'),
      limit(5)
    );
    const unsubscribePurchases = onSnapshot(recentPurchasesQuery, (snapshot) => {
      const purchases = [];
      snapshot.forEach((doc) => {
        purchases.push({ id: doc.id, ...doc.data() });
      });
      setRecentPurchases(purchases);
    }, (error) => {
      console.error('Fejl ved real-time opdatering af købs-historik:', error);
      toast.error('Fejl ved opdatering af købs-historik.');
    });

    return () => {
      unsubscribeStats();
      unsubscribePurchases();
    };
  }, []);

  const handleBuy = async (product) => {
    const productStatsRef = doc(db, 'stats', `product${product.id}`);
    const purchasesRef = collection(db, 'purchases');

    try {
      const productStatsSnap = await getDoc(productStatsRef);

      if (!productStatsSnap.exists()) {
        toast.error('Produktstatistikken findes ikke.');
        return;
      }

      const currentStock = productStatsSnap.data().stock || 0;

      if (currentStock <= 0) {
        toast.error('Dette produkt er ikke på lager.');
        return;
      }

      // Start en batch
      const batch = writeBatch(db);

      // Tilføj køb dokument
      const newPurchaseRef = doc(purchasesRef); // Auto-genereret ID
      batch.set(newPurchaseRef, {
        productId: product.id,
        name: product.name,
        price: product.price,
        timestamp: serverTimestamp(), // Brug server timestamp for konsistens
      });

      // Opdater stock ved at decrementere det med 1
      batch.update(productStatsRef, {
        stock: currentStock - 1,
        soldCount: (productStatsSnap.data().soldCount || 0) + 1,
      });

      // Commit batch operationen
      await batch.commit();

      console.log('Køb registreret med ID:', newPurchaseRef.id);
      toast.success(`Du har købt ${product.name} for ${product.price} kr.!`);
    } catch (e) {
      console.error('Fejl ved køb:', e);
      toast.error('Der opstod en fejl. Prøv igen senere.');
    }
  };

  return (
    <Layout>
      {/* Hero Sektion */}
      <Hero
        title="Salgs Sektion"
        subtitle="Køb vores innovative produkter og støt vores læringsprojekt."
        backgroundVideo={HeroVideoSales}
        scrollToId="products"
      />

      {/* Produkter Sektion */}
      <Section id="products" title="Vores Produkter" className="bg-white text-gray-900">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const stats = productStats[`product${product.id}`];
            const stock = stats ? stats.stock : 0;
            const productionInterval = stats ? stats.productionIntervalMinutes : 60;
            const lastProducedAt = stats ? stats.lastProducedAt : null;
            const nextProductionTime = stats ? calculateNextProductionTime(lastProducedAt, productionInterval) : 'Ingen data';

            return (
              <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                <img
                  src={product.image || defaultImage}
                  alt={product.name}
                  className="h-40 object-cover mb-4 rounded"
                />
                <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-xl font-bold mb-2">{product.price} kr.</p>
                <p className="text-gray-600 mb-2">På lager: {stock}</p>
                <p className="text-gray-600 mb-2">Produktionsinterval: hver {productionInterval} minut(er)</p>
                <p className="text-gray-600 mb-4">Næste produktion: {nextProductionTime}</p>
                <button
                  onClick={() => handleBuy(product)}
                  className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition flex items-center justify-center"
                  disabled={stock <= 0}
                >
                  <FaShoppingCart className="mr-2" /> Køb
                </button>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Salgs-Historik Sektion */}
      <Section id="salesHistory" title="Salgs-Historik" className="bg-white text-gray-900 mt-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Seneste Køb</h3>
          <ul>
            {recentPurchases.map((purchase) => (
              <li key={purchase.id} className="flex items-center mb-2">
                <FaClock className="text-blue-500 mr-2" />
                <span>
                  {purchase.name} købt for {purchase.price} kr. den {purchase.timestamp && new Date(purchase.timestamp.seconds * 1000).toLocaleString()}
                </span>
              </li>
            ))}
            {recentPurchases.length === 0 && <p>Ingen køb endnu.</p>}
          </ul>
        </div>
      </Section>
    </Layout>
  );
};

export default SalesPage;
