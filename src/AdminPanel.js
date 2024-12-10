// src/AdminPanel.js
import React, { useState } from 'react';
import Layout from './Layout.js';
import Hero from './Hero.js';
import Section from './Section.js';
import { FaShieldAlt } from 'react-icons/fa';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from './firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AdminHeroVideo from './assets/videos/admin-hero-video.mp4';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AdminPanel = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      // Her skal du implementere rollebaseret adgang (f.eks. tjek brugerens rolle)
      setAuthenticated(true);
      toast.success('Logget ind som admin!');
    } catch (error) {
      console.error('Fejl ved login:', error);
      toast.error('Forkert email eller adgangskode.');
    }
    setSubmitting(false);
  };

  const handleUpdateProducedCount = async (values, { setSubmitting, resetForm }) => {
    try {
      const statsRef = doc(db, 'stats', 'general');
      await updateDoc(statsRef, {
        producedCount: parseInt(values.producedCount, 10),
      });
      toast.success('Produceret antal opdateret!');
      resetForm();
    } catch (e) {
      console.error('Fejl ved opdatering:', e);
      toast.error('Der opstod en fejl. Prøv igen senere.');
    }
    setSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Sektion */}
      <Hero
        title="Admin Panel"
        subtitle="Administrer dine data og opdater systemet."
        backgroundVideo={AdminHeroVideo}
        scrollToId="admin-content"
      />

      {/* Indhold Sektion */}
      <Section id="admin-content" title="Admin Funktioner" className="bg-white text-gray-900">
        {!authenticated ? (
          // Login Formular med Formik og Yup
          <div className="flex justify-center">
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={Yup.object({
                email: Yup.string().email('Ugyldig email').required('Email er påkrævet'),
                password: Yup.string().required('Adgangskode er påkrævet'),
              })}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="w-full max-w-sm">
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                      Email:
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                      Adgangskode:
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Adgangskode"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                    >
                      {isSubmitting ? 'Logger ind...' : 'Log Ind'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          // Admin Indhold med Formik og Yup
          <div className="flex justify-center">
            <Formik
              initialValues={{ producedCount: '' }}
              validationSchema={Yup.object({
                producedCount: Yup.number()
                  .required('Produceret antal er påkrævet')
                  .integer('Skal være et helt tal')
                  .min(0, 'Skal være 0 eller højere'),
              })}
              onSubmit={handleUpdateProducedCount}
            >
              {({ isSubmitting }) => (
                <Form className="w-full max-w-sm">
                  <div className="mb-4">
                    <label htmlFor="producedCount" className="block text-gray-700 text-sm font-bold mb-2">
                      Ny produceret antal:
                    </label>
                    <Field
                      type="number"
                      id="producedCount"
                      name="producedCount"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Indtast antal"
                      min="0"
                    />
                    <ErrorMessage name="producedCount" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                    >
                      {isSubmitting ? 'Opdaterer...' : 'Opdater'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </Section>
    </Layout>
  );
};

export default AdminPanel;
