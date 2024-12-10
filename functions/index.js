// functions/index.js
const { onSchedule } = require('firebase-functions/v2/scheduler');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

// Scheduled Function til produktion (v2 API)
exports.scheduleProduction = onSchedule('every 15 minutes', async (event) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Definer tidsrammen: 06:30 - 15:00
  const startHour = 0;
  const startMinute = 0;
  const endHour = 23;
  const endMinute = 59;

  const isWithinTimeFrame =
    (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
    (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute));

  if (!isWithinTimeFrame) {
    console.log('Production time window closed.');
    return null;
  }

  try {
    const statsSnapshot = await db.collection('stats').get();
    const batch = db.batch();

    statsSnapshot.forEach((doc) => {
      if (doc.id.startsWith('product')) { // Kun produkt dokumenter
        const data = doc.data();
        const productionInterval = data.productionIntervalMinutes || 60; // Standard interval 60 minutter
        const productionAmount = data.productionAmount || 10; // Standard produktion mængde
        const lastProducedAt = data.lastProducedAt ? data.lastProducedAt.toDate() : null;

        if (!lastProducedAt) {
          // Hvis `lastProducedAt` ikke er sat, sæt den til nu og producer
          batch.update(doc.ref, {
            stock: admin.firestore.FieldValue.increment(productionAmount),
            producedCount: admin.firestore.FieldValue.increment(productionAmount),
            lastProducedAt: admin.firestore.Timestamp.fromDate(now),
          });
          console.log(`Initial production for ${doc.id}`);
        } else {
          const nextProductionTime = new Date(lastProducedAt.getTime() + productionInterval * 60000);
          
          if (now >= nextProductionTime) {
            // Tjek om næste produktionstidspunkt er inden for tidsrammen
            const isNextProductionWithinTimeFrame =
              (nextProductionTime.getHours() > startHour || (nextProductionTime.getHours() === startHour && nextProductionTime.getMinutes() >= startMinute)) &&
              (nextProductionTime.getHours() < endHour || (nextProductionTime.getHours() === endHour && nextProductionTime.getMinutes() <= endMinute));

            if (isNextProductionWithinTimeFrame) {
              batch.update(doc.ref, {
                stock: admin.firestore.FieldValue.increment(productionAmount),
                producedCount: admin.firestore.FieldValue.increment(productionAmount),
                lastProducedAt: admin.firestore.Timestamp.fromDate(now),
              });
              console.log(`Produced ${productionAmount} units for ${doc.id}`);
            } else {
              console.log(`Next production for ${doc.id} is outside the production window.`);
            }
          } else {
            console.log(`Not time to produce for ${doc.id}. Next production at ${nextProductionTime}`);
          }
        }
      }
    });

    await batch.commit();
    console.log('Production batch successfully committed.');
  } catch (error) {
    console.error('Error during production batch:', error);
  }

  return null;
});
