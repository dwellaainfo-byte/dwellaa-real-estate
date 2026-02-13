import { useTranslations } from 'next-intl';

export default function SimplePage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('home.title')}</h1>
        <p className="text-xl text-gray-600">{t('home.subtitle')}</p>
        <p className="mt-4 text-sm">If you see this, internationalization is working!</p>
      </div>
    </div>
  );
}