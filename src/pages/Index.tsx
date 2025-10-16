import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  const services: Service[] = [
    {
      id: 1,
      title: '3D Печать по вашей модели',
      description: 'Изготовим любую деталь по вашей 3D модели',
      price: 'от 500₽',
      features: ['FDM и SLA печать', 'Различные материалы', 'Постобработка', 'Срок 1-3 дня'],
      icon: 'Printer'
    },
    {
      id: 2,
      title: '3D Моделирование',
      description: 'Создадим 3D модель по вашему эскизу',
      price: 'от 2000₽',
      features: ['Техническое моделирование', 'Прототипирование', 'Чертежи', 'Консультация'],
      icon: 'Box'
    },
    {
      id: 3,
      title: 'Прототипирование',
      description: 'Быстрое создание прототипов изделий',
      price: 'от 3000₽',
      features: ['Функциональные прототипы', 'Тестирование', 'Доработка', 'Серийное производство'],
      icon: 'Lightbulb'
    }
  ];

  const addToCart = (service: Service) => {
    const existingItem = cart.find(item => item.id === service.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === service.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { 
        id: service.id, 
        name: service.title, 
        price: parseInt(service.price.replace(/\D/g, '')), 
        quantity: 1 
      }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-16">
            <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 animate-fade-in">
              <Badge className="mb-6 bg-gradient-to-r from-primary to-yellow-500 text-black border-0 px-6 py-2 text-sm hover:opacity-90">
                Премиум 3D Печать
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 font-heading">
                3D ПРИТОК
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                Профессиональная 3D печать по вашим моделям. Высокое качество, быстрые сроки, доступные цены.
              </p>
              <div className="flex gap-4 flex-wrap justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-yellow-500 text-black hover:opacity-90 px-8 py-6 text-lg"
                  onClick={() => setActiveSection('services')}
                >
                  <Icon name="Zap" className="mr-2" size={20} />
                  Заказать печать
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-black px-8 py-6 text-lg"
                  onClick={() => setActiveSection('catalog')}
                >
                  Смотреть работы
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-8 px-4">
              <Card className="bg-card border-border transition-transform duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-yellow-500 flex items-center justify-center mb-4">
                    <Icon name="Clock" className="text-black" size={24} />
                  </div>
                  <CardTitle>Быстро</CardTitle>
                  <CardDescription>Срок печати от 1 дня</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-card border-border transition-transform duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-yellow-500 flex items-center justify-center mb-4">
                    <Icon name="Award" className="text-black" size={24} />
                  </div>
                  <CardTitle>Качественно</CardTitle>
                  <CardDescription>Профессиональное оборудование</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-card border-border transition-transform duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-yellow-500 flex items-center justify-center mb-4">
                    <Icon name="Wallet" className="text-black" size={24} />
                  </div>
                  <CardTitle>Выгодно</CardTitle>
                  <CardDescription>Доступные цены на услуги</CardDescription>
                </CardHeader>
              </Card>
            </section>
          </div>
        );

      case 'catalog':
        return (
          <div className="px-4 py-8 animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 font-heading">Наши работы</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card key={item} className="bg-card border-border transition-transform duration-300 hover:scale-105 overflow-hidden">
                  <div className="aspect-square bg-secondary flex items-center justify-center">
                    <Icon name="Box" size={64} className="text-primary" />
                  </div>
                  <CardHeader>
                    <CardTitle>Проект {item}</CardTitle>
                    <CardDescription>Функциональный прототип изделия</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="px-4 py-8 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 font-heading">Наши услуги</h2>
            <p className="text-muted-foreground mb-8 text-lg">Выберите подходящую услугу и добавьте в корзину</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="bg-card border-border transition-transform duration-300 hover:scale-105 flex flex-col">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-yellow-500 flex items-center justify-center mb-4">
                      <Icon name={service.icon as any} className="text-black" size={32} />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent mb-4">{service.price}</div>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Icon name="Check" size={16} className="text-primary mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-yellow-500 text-black hover:opacity-90"
                      onClick={() => addToCart(service)}
                    >
                      <Icon name="ShoppingCart" className="mr-2" size={18} />
                      Добавить в корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="px-4 py-8 max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 font-heading">О нас</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                <span className="bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent font-bold text-2xl">3D ПРИТОК</span> — профессиональная студия 3D печати, 
                специализирующаяся на изготовлении деталей и прототипов по индивидуальным моделям клиентов.
              </p>
              <p>
                Мы используем современное оборудование и качественные материалы для обеспечения высокой точности 
                и надежности изготавливаемых изделий.
              </p>
              <div className="grid md:grid-cols-2 gap-4 pt-6">
                <div className="flex items-start gap-3">
                  <Icon name="Target" className="text-primary mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Наша миссия</h3>
                    <p className="text-sm">Делать 3D печать доступной и качественной для каждого</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Users" className="text-primary mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Опыт</h3>
                    <p className="text-sm">Более 500 успешно реализованных проектов</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contacts':
        return (
          <div className="px-4 py-8 max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 font-heading">Контакты</h2>
            <Card className="bg-card border-border">
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" className="text-black" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" className="text-black" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@3dpritok.ru</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" className="text-black" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Адрес</h3>
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" className="text-black" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Режим работы</h3>
                    <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('home')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-yellow-500 flex items-center justify-center">
              <Icon name="Printer" className="text-black" size={20} />
            </div>
            <span className="text-xl font-bold font-heading">3D ПРИТОК</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { id: 'home', label: 'Главная', icon: 'Home' },
              { id: 'catalog', label: 'Каталог', icon: 'Grid' },
              { id: 'services', label: 'Услуги', icon: 'Settings' },
              { id: 'about', label: 'О нас', icon: 'Info' },
              { id: 'contacts', label: 'Контакты', icon: 'Mail' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative border-primary">
                  <Icon name="ShoppingCart" size={20} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-primary to-yellow-500 text-black border-0">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-card border-border">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cartCount > 0 ? `Товаров в корзине: ${cartCount}` : 'Корзина пустая'}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.map((item) => (
                    <Card key={item.id} className="bg-secondary border-border">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="X" size={14} />
                          </Button>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">x{item.quantity}</span>
                          <span className="font-bold text-primary">{item.price * item.quantity}₽</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {cartCount > 0 && (
                    <>
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Итого:</span>
                        <span className="bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent text-2xl">{cartTotal}₽</span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-yellow-500 text-black hover:opacity-90" size="lg">
                        Оформить заказ
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden border-primary">
                  <Icon name="Menu" size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-card border-border">
                <SheetHeader>
                  <SheetTitle>Меню</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {[
                    { id: 'home', label: 'Главная', icon: 'Home' },
                    { id: 'catalog', label: 'Каталог', icon: 'Grid' },
                    { id: 'services', label: 'Услуги', icon: 'Settings' },
                    { id: 'about', label: 'О нас', icon: 'Info' },
                    { id: 'contacts', label: 'Контакты', icon: 'Mail' },
                  ].map((item) => (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? 'default' : 'ghost'}
                      className={activeSection === item.id ? 'bg-gradient-to-r from-primary to-yellow-500 text-black' : ''}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <Icon name={item.icon as any} className="mr-2" size={18} />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {renderSection()}
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container px-4 text-center text-muted-foreground">
          <p className="text-sm">© 2024 3D ПРИТОК. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
