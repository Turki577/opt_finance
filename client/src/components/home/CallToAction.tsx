import { useTranslation } from 'react-i18next';

const CallToAction = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-primary py-16">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">{t('callToAction.title')}</h2>
        <p className="text-white text-lg mb-8 max-w-3xl mx-auto">
          {t('callToAction.description')}
        </p>
        <a 
          href="#contact" 
          className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        >
          {t('callToAction.button')}
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
