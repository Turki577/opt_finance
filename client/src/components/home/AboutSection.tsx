import { useTranslation } from 'react-i18next';
import { BarChart3, Handshake, Target } from 'lucide-react';

const AboutSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: t('about.feature1.title'),
      description: t('about.feature1.description')
    },
    {
      icon: <Handshake className="h-10 w-10" />,
      title: t('about.feature2.title'),
      description: t('about.feature2.description')
    },
    {
      icon: <Target className="h-10 w-10" />,
      title: t('about.feature3.title'),
      description: t('about.feature3.description')
    }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('about.title')}</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            {t('about.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-neutral-light rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-primary text-4xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
