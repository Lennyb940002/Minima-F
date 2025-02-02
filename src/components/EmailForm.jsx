import React, { useState } from 'react';
import { MailCheck, Loader2 } from 'lucide-react';
import logo from '../image/logo.png';

function EmailForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'https://minima-b.vercel.app';
      const apiUrl = `${baseUrl}/api/emails`;
      
      console.log('Tentative de connexion à:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Réponse du serveur:', data);

      setSubmitStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Erreur détaillée:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || "Une erreur de connexion est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Le reste du composant reste identique...
  // (J'ai gardé seulement la partie qui nécessitait des modifications)

  return (
    // ... votre JSX existant
  );
}

export default EmailForm;
