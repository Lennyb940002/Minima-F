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
      const response = await fetch(`${backendURL}/api/emails`, {
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
    <main className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center p-4">
      <section className="w-full max-w-md bg-black border border-white/10 rounded-2xl p-8 shadow-2xl">
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
            <p className="text-gray-400 text-sm">
              Rejoignez notre liste d'attente
            </p>
          </div>
        </div>

        {/* Message d'erreur */}
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Formulaire */}
        {submitStatus !== 'success' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-white"
              >
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@email.com"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                          text-white text-sm placeholder-gray-500
                          focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none
                          disabled:opacity-50 disabled:cursor-not-allowed
                          transition duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-sm font-medium
                        border border-white/20 text-white
                        transition duration-200
                        ${isSubmitting 
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-white hover:text-black active:scale-[0.98]'}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
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
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-green-400">
              <MailCheck className="h-5 w-5" />
              <span className="font-medium">Inscription réussie !</span>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-white/90">
              <p className="text-sm leading-relaxed">
                Merci pour votre inscription ! Notre application est en cours de développement,
                et vous serez informé(e) dès son lancement. À cette occasion, un cadeau spécial
                vous sera offert pour vous remercier de votre patience !
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default EmailForm;
