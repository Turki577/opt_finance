import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Mail, 
  MapPin,
  Linkedin,
  Instagram
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'يجب أن يحتوي الاسم على حرفين على الأقل'
  }),
  email: z.string().email({
    message: 'يرجى إدخال بريد إلكتروني صحيح'
  }),
  phone: z.string().optional(),
  service: z.string().min(1, {
    message: 'يرجى اختيار الخدمة المطلوبة'
  }),
  message: z.string().min(10, {
    message: 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل'
  })
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    }
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/contact', data);
      
      toast({
        title: t('contact.success'),
        description: t('contact.successMessage')
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: t('contact.error'),
        description: t('contact.errorMessage'),
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-16 bg-neutral-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('contact.title')}</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6 text-gray-800">{t('contact.form.title')}</h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.name')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.email')}</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.phone')}</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.service')}</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('contact.form.servicePlaceholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="personal-planning">{t('services.individual.service1.title')}</SelectItem>
                          <SelectItem value="debt-management">{t('services.individual.service2.title')}</SelectItem>
                          <SelectItem value="investment-consulting">{t('services.individual.service3.title')}</SelectItem>
                          <SelectItem value="feasibility-study">{t('services.business.service1.title')}</SelectItem>
                          <SelectItem value="business-planning">{t('services.business.service2.title')}</SelectItem>
                          <SelectItem value="property-valuation">{t('services.additional.service2.title')}</SelectItem>
                          <SelectItem value="other">{t('contact.form.otherService')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.message')}</FormLabel>
                      <FormControl>
                        <Textarea rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-800">{t('contact.info.title')}</h3>

            <div className="space-y-6">
              <div className="flex">
                <div className="mr-4 text-primary text-2xl">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t('contact.info.email')}</h4>
                  <p className="text-gray-600">info@optfinance.org</p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 text-primary text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t('contact.info.whatsapp')}</h4>
                  <p className="text-gray-600">+966 594870155</p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 text-primary text-2xl">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t('contact.info.address')}</h4>
                  <p className="text-gray-600">{t('contact.info.addressValue')}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">{t('contact.info.followUs')}</h3>
              <div className="flex space-x-4 space-x-reverse">
                <a 
                  href="https://x.com/optfinance_sa" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l11.5 11.5" />
                    <path d="M20 4l-4.5 4.5" />
                    <path d="M4 20l7.5-7.5" />
                    <path d="M15.5 15.5L20 20" />
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@infowjj2kg?_t=zs-8w7ntrproen&_r=1" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                  aria-label="TikTok"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/optfinance_sa?igsh=cwq0mthwenqwanlp" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                  aria-label="Telegram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 7.5a2.25 2.25 0 0 0 .128 4.277l3.897 1.289a1 1 0 0 0 1.018-.223l5.278-4.878a.5.5 0 0 1 .68.738l-5.38 5.87c-.368.402-.291.916.153 1.162l5.508 3.059a2.25 2.25 0 0 0 3.29-1.73l1.952-16.508A2.25 2.25 0 0 0 21.198 2.433z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
