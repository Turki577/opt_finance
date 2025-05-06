import { useTranslation } from 'react-i18next';

const HeroBanner = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: 'url("/city-buildings.png")',
          filter: 'brightness(0.3)'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/50"></div>
      <div className="container-custom py-16 md:py-24 relative">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-white text-lg md:text-xl opacity-90 mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#services"
              className="px-6 py-3 bg-secondary text-white font-medium rounded-md shadow hover:bg-secondary-dark transition-colors"
            >
              {t('hero.discoverServices')}
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-white text-primary font-medium rounded-md shadow hover:bg-gray-100 transition-colors"
            >
              {t('hero.contactUs')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
