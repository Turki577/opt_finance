import { useState } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container-custom">
        <div className="flex justify-between items-center py-3">
          <Link href="/">
            <span className="inline-flex items-center cursor-pointer text-2xl font-bold text-primary">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="ml-2 h-6 w-6"
              >
                <circle cx="12" cy="12" r="1" />
                <path d="M5.5 20a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                <path d="M20.5 14.2a3.5 3.5 0 0 0-5.9 2.8" />
                <path d="M18 8a3 3 0 0 0-4 5" />
                <path d="M7.5 12a3 3 0 0 0 4-5" />
                <path d="M22 22H2" />
                <path d="M12 22v-8.3a2 2 0 1 0 0-4V2" />
              </svg>
              <span>{t('header.title')}</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <a href="#about" className="px-3 py-2 font-medium hover:text-primary transition-colors">
              {t('header.aboutUs')}
            </a>
            <a href="#services" className="px-3 py-2 font-medium hover:text-primary transition-colors">
              {t('header.services')}
            </a>
            <a href="#contact" className="px-3 py-2 font-medium hover:text-primary transition-colors">
              {t('header.contactUs')}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={cn(
            'md:hidden pt-4 pb-2 border-t mt-2 transition-all duration-300',
            isMobileMenuOpen ? 'block' : 'hidden'
          )}
        >
          <a
            href="#about"
            className="block py-2 font-medium hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('header.aboutUs')}
          </a>
          <a
            href="#services"
            className="block py-2 font-medium hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('header.services')}
          </a>
          <a
            href="#contact"
            className="block py-2 font-medium hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('header.contactUs')}
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
