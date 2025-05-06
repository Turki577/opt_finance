import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/home/HeroBanner';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CallToAction from '@/components/home/CallToAction';
import ContactSection from '@/components/home/ContactSection';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <HeroBanner />
          <AboutSection />
          <ServicesSection />
          <WhyChooseUs />
          <CallToAction />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
