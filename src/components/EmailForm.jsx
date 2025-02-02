import React, { useState } from 'react';
import { MailCheck, Loader2, AlertCircle } from 'lucide-react';
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
      const backendURL = import.meta.env.VITE_BACKEND_URL || 'https://minima-b.vercel.app';
      const url = backendURL.endsWith('/api') ? `${backendURL}/emails` : `${backendURL}/api/emails`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        throw new Error(data.message || "Une erreur est survenue lors de l'inscription");
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
      setErrorMessage("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-16 px-6">
      <section className="w-full max-w-md bg-black rounded-2xl p-8 shadow-2xl">
        {/* Logo et En-tête */}
        <div className="flex flex-col items-center space-y-6 mb-8">
          <img
            src={logo}
            alt="Logo Minima"
            className="h-40 w-40 object-contain"
          />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">
              Minima
            </h1>
          </div>
        </div>

        {/* Message d'erreur */}
        {submitStatus === 'error' && (
          <div className="mb-3 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Formulaire */}
        {submitStatus !== 'success' && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-white text-left mb-1"
              >
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                required
                disabled={isSubmitting}
                className="w-[350px] max-w-md px-3 py-2 bg-transparent border border-white/20 rounded-lg text-white text-xs focus:border-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold
                        border border-white text-white
                        transition-colors
                        ${isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-white hover:text-black'}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Chargement...</span>
                </div>
              ) : (
                "S'inscrire"
              )}
            </button>
          </form>
        )}

        {/* Message de succès */}
        {submitStatus === 'success' && (
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-center gap-2 text-green-400 text-xs">
              <MailCheck className="w-3 h-3" />
              <span>Inscription réussie !</span>
            </div>

            <div className="w-[350px] max-w-md px-3 py-2 bg-transparent border border-white/20 rounded-lg text-white text-xs">
              <p className="flex items-start gap-2">
                <MailCheck className="w-3 h-3 mt-1 flex-shrink-0" />
                <span>
                  Merci pour votre inscription ! Notre application est en cours de développement,
                  et vous serez informé(e) dès son lancement. À cette occasion, un cadeau spécial
                  vous sera offert pour vous remercier de votre patience !
                </span>
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default EmailForm;
