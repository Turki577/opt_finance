import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const reasons = [
    {
      title: t('whyChooseUs.reason1.title'),
      description: t('whyChooseUs.reason1.description')
    },
    {
      title: t('whyChooseUs.reason2.title'),
      description: t('whyChooseUs.reason2.description')
    },
    {
      title: t('whyChooseUs.reason3.title'),
      description: t('whyChooseUs.reason3.description')
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{t('whyChooseUs.title')}</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <div className="flex" key={index}>
                  <div className="mt-1 ml-4 text-primary">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                    <p className="text-gray-600">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full text-primary opacity-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <polygon points="0,0 100,0 0,100" />
              <polygon points="100,0 100,100 0,100" opacity="0.5" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-1/2 h-1/2 text-primary opacity-20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 2v2" />
                <path d="M12 16v6" />
                <path d="M16 4.93C17.41 6.11 18 7 18 10c0 3-1.6 4-6 4s-6-1-6-4c0-3 .59-3.89 2-5.07" />
                <path d="M10 16h.01" />
                <path d="M14 16h.01" />
              </svg>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
