import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../Context/SurveyContext';
import { ShieldCheck, Music, Info, ArrowRight } from 'lucide-react';

export default function Consent() {
  const navigate = useNavigate();
  const { consent, updateConsent, isConsentComplete } = useSurvey();

  const handleContinue = (e) => {
    e.preventDefault();
    if (isConsentComplete()) {
      navigate('/spotify-connect');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      
      {/* Header Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18212B] border border-[#26313C] text-xs font-mono text-[#1DB954]">
          <ShieldCheck className="w-4 h-4" />
          <span>INFORMED VOLUNTARY CONSENT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
          Research Study Participation & Spotify Data Scope
        </h1>
        <p className="text-base sm:text-lg text-[#A7B0BC]">
          Please review the study disclosure and Spotify automated data collection scope carefully.
        </p>
      </div>

      {/* Informed Disclosure Document Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#141B24] border border-[#26313C] space-y-8 shadow-xl">
        
        {/* Disclosure Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          
          <div className="p-5 rounded-2xl bg-[#0E141B] border border-[#26313C] space-y-2">
            <h3 className="font-semibold text-[#F5F7FA] text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
              What Spotify information is collected?
            </h3>
            <p className="text-[#A7B0BC] leading-relaxed">
              Top artists across 3 time ranges, top tracks, recently played track timestamps (50 sample tracks), and basic library counts (playlists & saved track count).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E141B] border border-[#26313C] space-y-2">
            <h3 className="font-semibold text-[#F5F7FA] text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
              Why is it collected?
            </h3>
            <p className="text-[#A7B0BC] leading-relaxed">
              To automatically extract numerical statistical features (temporal listening distributions, release year statistics, explicit ratios, diversity metrics) for ML age-group prediction modeling.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E141B] border border-[#26313C] space-y-2">
            <h3 className="font-semibold text-[#F5F7FA] text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
              Anonymization & Storage
            </h3>
            <p className="text-[#A7B0BC] leading-relaxed">
              Raw Spotify track lists and OAuth tokens are never stored in the database. Only anonymous, non-identifying statistical feature vectors paired with your age-group cohort are stored.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E141B] border border-[#26313C] space-y-2">
            <h3 className="font-semibold text-[#F5F7FA] text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
              Retention & Deletion Rights
            </h3>
            <p className="text-[#A7B0BC] leading-relaxed">
              Participants retain the right to request deletion of their submitted dataset row at any time using their participant receipt ID.
            </p>
          </div>

        </div>

        {/* Highlight Callout */}
        <div className="p-4 rounded-2xl bg-[#18212B] border border-[#26313C] flex items-center gap-3 text-xs text-[#A7B0BC]">
          <Info className="w-5 h-5 text-[#1DB954] shrink-0" />
          <span>
            <strong>Participation is completely voluntary.</strong> You may stop the process or disconnect Spotify at any point prior to final submission.
          </span>
        </div>

        {/* Checkbox Form */}
        <form onSubmit={handleContinue} className="space-y-4 pt-4 border-t border-[#26313C]">
          <h3 className="font-bold text-[#F5F7FA] text-base mb-4">
            Required Affirmations (Check all to proceed):
          </h3>

          {/* Checkbox 1 */}
          <label className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer select-none ${
            consent.understandData 
              ? 'bg-[#18212B] border-[#1DB954]' 
              : 'bg-[#0E141B] border-[#26313C] hover:border-[#6F7A87]'
          }`}>
            <input
              type="checkbox"
              checked={consent.understandData}
              onChange={(e) => updateConsent('understandData', e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-[#26313C] text-[#1DB954] focus:ring-[#1DB954] bg-[#090D12] accent-[#1DB954]"
            />
            <span className="text-sm font-medium text-[#F5F7FA]">
              I understand what Spotify metadata and demographic information this study collects.
            </span>
          </label>

          {/* Checkbox 2 */}
          <label className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer select-none ${
            consent.agreeParticipate 
              ? 'bg-[#18212B] border-[#1DB954]' 
              : 'bg-[#0E141B] border-[#26313C] hover:border-[#6F7A87]'
          }`}>
            <input
              type="checkbox"
              checked={consent.agreeParticipate}
              onChange={(e) => updateConsent('agreeParticipate', e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-[#26313C] text-[#1DB954] focus:ring-[#1DB954] bg-[#090D12] accent-[#1DB954]"
            />
            <span className="text-sm font-medium text-[#F5F7FA]">
              I voluntarily agree to authenticate Spotify and participate in the research study.
            </span>
          </label>

          {/* Checkbox 3 */}
          <label className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer select-none ${
            consent.agreeAnalysis 
              ? 'bg-[#18212B] border-[#1DB954]' 
              : 'bg-[#0E141B] border-[#26313C] hover:border-[#6F7A87]'
          }`}>
            <input
              type="checkbox"
              checked={consent.agreeAnalysis}
              onChange={(e) => updateConsent('agreeAnalysis', e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-[#26313C] text-[#1DB954] focus:ring-[#1DB954] bg-[#090D12] accent-[#1DB954]"
            />
            <span className="text-sm font-medium text-[#F5F7FA]">
              I understand that my derived statistical features will be used for machine learning age group modeling.
            </span>
          </label>

          {/* Continue Button */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0E141B] text-[#A7B0BC] hover:text-white border border-[#26313C] font-medium text-sm transition-all"
            >
              Cancel & Exit
            </button>

            <button
              type="submit"
              disabled={!isConsentComplete()}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-200 ${
                isConsentComplete()
                  ? 'bg-[#1DB954] hover:bg-[#1ED760] text-[#090D12] shadow-lg shadow-[#1DB954]/20 cursor-pointer'
                  : 'bg-[#26313C] text-[#6F7A87] cursor-not-allowed opacity-60'
              }`}
            >
              <Music className="w-5 h-5 fill-current" />
              <span>Connect Spotify</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}