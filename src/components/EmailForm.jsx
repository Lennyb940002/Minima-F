import React, { useState } from 'react';
import { MailCheck } from 'lucide-react';
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
        const data = await response.json();
        setSubmitStatus('error');
        setErrorMessage(data.message || "Une erreur est survenue lors de l'inscription.");
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
    <section className="min-h-screen flex flex-col items-center justify-center py-16 px-6">
      <div className="w-full max-w-md p-6 rounded-lg bg-black shadow-lg">
        <div className="flex flex-col items-center text-center mb-10">
          <img src={logo} alt="Logo" className="h-40 w-40" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-4 text-center">Minima</h2>

        {submitStatus === 'error' && (
          <div className="mb-3 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-white text-left mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[350px] max-w-md px-3 py-2 bg-transparent border border-white/20 rounded-lg text-white text-xs focus:border-white focus:outline-none"
              required
              disabled={isSubmitting}
              placeholder="Votre email"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-3 border border-white text-white text-xs font-semibold transition-colors rounded-lg 
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Chargement...' : "S'inscrire"}
          </button>
        </form>

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
      </div>
    </section>
  );
}

export default EmailForm;
