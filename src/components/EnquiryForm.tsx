import { useEffect, useRef, useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';
import {
  ENQUIRY_TOPICS,
  validateEnquiryPayload,
  type ValidationErrors,
} from '../utils/enquiryValidation';

interface SubmissionConfirmation {
  referenceId: string;
  message: string;
  fullName: string;
  topic: string;
}

export function EnquiryForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [topic, setTopic] = useState<string>(ENQUIRY_TOPICS[0]);
  const [message, setMessage] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState(''); // Honeypot

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<SubmissionConfirmation | null>(null);
  const confirmationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (confirmation && confirmationRef.current) {
      confirmationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      confirmationRef.current.focus({ preventScroll: true });
    }
  }, [confirmation]);

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(`[Aquora Enquiry] ${topic} — ${fullName || 'Website Visitor'}`);
    const body = encodeURIComponent(
      [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Farm / Organization: ${organization || 'Not provided'}`,
        `Topic: ${topic}`,
        '',
        message,
      ].join('\n')
    );
    return `mailto:otuyasky11@gmail.com?subject=${subject}&body=${body}`;
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const validation = validateEnquiryPayload({
      fullName,
      email,
      phone,
      organization,
      topic,
      message,
      websiteUrl,
    });

    if (!validation.isValid && !validation.isSpam) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const customEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;
    const endpoint = customEndpoint?.trim() || '/api/enquiries';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          organization,
          topic,
          message,
          websiteUrl,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await response.json() : null;

      if (!response.ok) {
        if (data?.errors) {
          setErrors(data.errors);
        }
        setServerError(
          data?.message ||
            'Unable to reach the enquiry service right now. You can send your message directly to otuyasky11@gmail.com using the link below.'
        );
        return;
      }

      setConfirmation({
        referenceId:
          data?.referenceId || `AQ-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
        message:
          data?.message ||
          'Thank you for contacting Aquora. Our team has received your enquiry and will respond via email or phone.',
        fullName: validation.sanitized.fullName || fullName,
        topic: validation.sanitized.topic || topic,
      });

      setFullName('');
      setEmail('');
      setPhone('');
      setOrganization('');
      setTopic(ENQUIRY_TOPICS[0]);
      setMessage('');
      setWebsiteUrl('');
    } catch {
      setServerError(
        'Could not connect to the enquiry service. You can send your message directly to otuyasky11@gmail.com using the link below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div
        ref={confirmationRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="p-6 sm:p-8 rounded-lg bg-white border border-[#184435]/15 focus:outline-none"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-[#184435] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-display text-xl font-semibold text-[#184435]">
              Enquiry Logged Successfully
            </h3>
            <p className="mt-2 text-sm text-[#184435]/80 leading-relaxed">
              {confirmation.message}
            </p>
            <dl className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-md bg-[#FAF7EE] border border-[#184435]/10 text-sm">
              <div>
                <dt className="text-xs text-[#184435]/60">Reference ID</dt>
                <dd className="font-semibold text-[#184435] tabular-nums mt-0.5">
                  {confirmation.referenceId}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#184435]/60">Submitted By</dt>
                <dd className="font-semibold text-[#184435] mt-0.5">{confirmation.fullName}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#184435]/60">Topic</dt>
                <dd className="font-semibold text-[#184435] mt-0.5">{confirmation.topic}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => setConfirmation(null)}
              className="mt-6 inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-[#184435] text-[#FAF7EE] text-sm font-medium hover:bg-[#1b7895] transition-colors"
            >
              Send Another Enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 sm:p-8 rounded-lg bg-white border border-[#184435]/15 space-y-5"
    >
      <div>
        <h3 className="font-display text-xl font-semibold text-[#184435]">
          Send an Enquiry
        </h3>
        <p className="mt-1 text-sm text-[#184435]/75">
          Share your farm setup, hardware interest, or partnership goals and our team will follow up.
        </p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 p-3.5 rounded-md bg-[#ff6f61]/15 border border-[#ff6f61] text-sm text-[#184435]"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#184435]" aria-hidden="true" />
          <div className="space-y-1.5">
            <p>{serverError}</p>
            <a
              href={buildMailtoHref()}
              className="inline-block font-semibold underline text-[#184435] hover:text-[#1b7895]"
            >
              Open pre-filled email to otuyasky11@gmail.com
            </a>
          </div>
        </div>
      )}

      {/* Honeypot field hidden from human users */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="websiteUrl">Website URL</label>
        <input
          id="websiteUrl"
          name="websiteUrl"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-[#184435] mb-1.5">
            Full Name <span className="text-[#ff6f61]">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            placeholder="e.g. Adewale Ogunleye"
            className={`w-full px-3.5 py-2.5 rounded-md border text-sm bg-[#FAF7EE]/50 text-[#184435] placeholder:text-[#184435]/45 ${
              errors.fullName ? 'border-[#ff6f61]' : 'border-[#184435]/20'
            }`}
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-1.5 text-xs font-medium text-[#b9382c]">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#184435] mb-1.5">
            Email Address <span className="text-[#ff6f61]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="name@example.com"
            className={`w-full px-3.5 py-2.5 rounded-md border text-sm bg-[#FAF7EE]/50 text-[#184435] placeholder:text-[#184435]/45 ${
              errors.email ? 'border-[#ff6f61]' : 'border-[#184435]/20'
            }`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs font-medium text-[#b9382c]">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#184435] mb-1.5">
            Phone Number <span className="text-xs font-normal text-[#184435]/60">(Optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            placeholder="+234 800 000 0000"
            className={`w-full px-3.5 py-2.5 rounded-md border text-sm bg-[#FAF7EE]/50 text-[#184435] placeholder:text-[#184435]/45 ${
              errors.phone ? 'border-[#ff6f61]' : 'border-[#184435]/20'
            }`}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs font-medium text-[#b9382c]">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-[#184435] mb-1.5">
            Farm or Organization{' '}
            <span className="text-xs font-normal text-[#184435]/60">(Optional)</span>
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="e.g. Riverbend Fish Farm"
            className="w-full px-3.5 py-2.5 rounded-md border border-[#184435]/20 text-sm bg-[#FAF7EE]/50 text-[#184435] placeholder:text-[#184435]/45"
          />
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-[#184435] mb-1.5">
          Enquiry Topic <span className="text-[#ff6f61]">*</span>
        </label>
        <select
          id="topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          aria-invalid={Boolean(errors.topic)}
          aria-describedby={errors.topic ? 'topic-error' : undefined}
          className={`w-full px-3.5 py-2.5 rounded-md border text-sm bg-[#FAF7EE]/50 text-[#184435] ${
            errors.topic ? 'border-[#ff6f61]' : 'border-[#184435]/20'
          }`}
        >
          {ENQUIRY_TOPICS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.topic && (
          <p id="topic-error" className="mt-1.5 text-xs font-medium text-[#b9382c]">
            {errors.topic}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#184435] mb-1.5">
          How Can Aquora Help? <span className="text-[#ff6f61]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          placeholder="Tell us about your pond count, species, or partnership question..."
          className={`w-full px-3.5 py-2.5 rounded-md border text-sm bg-[#FAF7EE]/50 text-[#184435] placeholder:text-[#184435]/45 ${
            errors.message ? 'border-[#ff6f61]' : 'border-[#184435]/20'
          }`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs font-medium text-[#b9382c]">
            {errors.message}
          </p>
        )}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-[#184435]/65">
          Required fields are marked with <span className="text-[#ff6f61]">*</span>.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#184435] text-[#FAF7EE] font-display text-sm font-semibold hover:bg-[#1b7895] disabled:opacity-60 transition-colors duration-150 whitespace-nowrap shrink-0"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
          <span>{isSubmitting ? 'Submitting...' : 'Submit Enquiry'}</span>
        </button>
      </div>
    </form>
  );
}
