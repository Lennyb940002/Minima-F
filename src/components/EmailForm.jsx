import React, { useState } from 'react';
import { MailCheck } from 'lucide-react';
import logo from '../image/logo.png';

function EmailForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
        setErrorMessage('Une erreur est survenue lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setErrorMessage('Une erreur de connexion est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-4 flex flex-col items-center text-center">
      <div className="w-full max-w-md p-8 rounded-lg backdrop-blur-sm mb-40">
        <div className="flex flex-col items-center text-center mb-14">
          <img src={logo} alt="Logo" className="h-48 w-48" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Minima</h2>

        {submitStatus === 'error' && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1 mt-12 mr-96">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-2 px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
              required
              disabled={isSubmitting}
              placeholder="Votre email"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 border border-white text-white transition-colors rounded-lg mt-6 
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Chargement...' : 'S\'inscrire'}
          </button>
        </form>

        {submitStatus === 'success' && (
          <div className="flex items-center justify-center gap-2 mt-4 text-green-400">
            <MailCheck className="w-4 h-4" />
            <span>Inscription réussie !</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default EmailForm;
