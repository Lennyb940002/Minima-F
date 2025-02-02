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

  const renderSuccessMessage = () => (
    <div className="space-y-4 mt-4 animate-fade-in">
      <div className="flex items-center justify-center gap-2 text-green-400 text-xs">
        <MailCheck className="w-4 h-4" />
        <span>Inscription réussie !</span>
      </div>

      <div className="w-full px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-lg text-white text-xs">
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
  );

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-md p-8 rounded-xl bg-black/80 backdrop-blur-lg shadow-xl border border-white/10">
        <div className="flex flex-col items-center text-center mb-8">
          <img 
            src={logo} 
            alt="Logo Minima" 
            className="h-32 w-32 object-contain drop-shadow-2xl" 
          />
          <h2 className="text-2xl font-bold text-white mt-6">Minima</h2>
          <p className="text-gray-400 text-sm mt-2">Rejoignez notre liste d'attente</p>
        </div>

        {submitStatus === 'error' && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs animate-shake">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-white text-left mb-2"
            >
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                        text-white text-sm placeholder-gray-500
                        focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30
                        transition-all duration-200"
              required
              disabled={isSubmitting}
              placeholder="exemple@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 px-4 border border-white/20 rounded-lg
                      text-sm font-medium text-white transition-all duration-200
                      ${isSubmitting 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-white hover:text-black hover:border-white active:scale-98'
                      }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Chargement...
              </span>
            ) : (
              "S'inscrire"
            )}
          </button>
        </form>

        {submitStatus === 'success' && renderSuccessMessage()}
      </div>
    </section>
  );
}

export default EmailForm;
