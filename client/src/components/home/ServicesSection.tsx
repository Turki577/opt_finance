import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  HandCoins, 
  Umbrella, 
  FileSpreadsheet, 
  Briefcase,
  Scale,
  Building,
  Calculator,
  Video,
  FileText,
  ClipboardPen
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => (
  <div className="flex bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="text-primary text-3xl ml-4">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const ServicesSection = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('individuals');

  const individualServices = [
    {
      icon: <Wallet className="h-8 w-8" />,
      title: t('services.individual.service1.title'),
      description: t('services.individual.service1.description')
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: t('services.individual.service2.title'),
      description: t('services.individual.service2.description')
    },
    {
      icon: <HandCoins className="h-8 w-8" />,
      title: t('services.individual.service3.title'),
      description: t('services.individual.service3.description')
    }
  ];

  const businessServices = [
    {
      icon: <FileSpreadsheet className="h-8 w-8" />,
      title: t('services.business.service1.title'),
      description: t('services.business.service1.description')
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: t('services.business.service2.title'),
      description: t('services.business.service2.description')
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: t('services.business.service3.title'),
      description: t('services.business.service3.description')
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: t('services.business.service4.title'),
      description: t('services.business.service4.description')
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: t('services.business.service5.title'),
      description: t('services.business.service5.description')
    }
  ];

  const additionalServices = [
    {
      icon: <Video className="h-8 w-8" />,
      title: t('services.additional.service1.title'),
      description: t('services.additional.service1.description')
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: t('services.additional.service2.title'),
      description: t('services.additional.service2.description')
    }
  ];

  return (
    <section id="services" className="py-16 bg-neutral-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('services.title')}</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            {t('services.description')}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center">
            <TabsList className="mb-8 bg-transparent border-b border-gray-200 rounded-none w-auto">
              <TabsTrigger 
                value="individuals" 
                className="py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {t('services.tabs.individuals')}
              </TabsTrigger>
              <TabsTrigger 
                value="business" 
                className="py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {t('services.tabs.business')}
              </TabsTrigger>
              <TabsTrigger 
                value="additional" 
                className="py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {t('services.tabs.additional')}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="individuals" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {individualServices.map((service, index) => (
              <ServiceCard 
                key={`individual-${index}`} 
                icon={service.icon} 
                title={service.title} 
                description={service.description} 
              />
            ))}
          </TabsContent>

          <TabsContent value="business" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {businessServices.map((service, index) => (
              <ServiceCard 
                key={`business-${index}`} 
                icon={service.icon} 
                title={service.title} 
                description={service.description} 
              />
            ))}
          </TabsContent>

          <TabsContent value="additional" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {additionalServices.map((service, index) => (
              <ServiceCard 
                key={`additional-${index}`} 
                icon={service.icon} 
                title={service.title} 
                description={service.description} 
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ServicesSection;
