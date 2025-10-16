import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  features: string[];
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: 'PLA пластик (1кг)',
      description: 'Высококачественный PLA филамент для FDM печати',
      price: 1500,
      category: 'materials',
      image: '🎨',
      inStock: true,
      features: ['Диаметр 1.75мм', 'Точность ±0.05мм', 'Различные цвета']
    },
    {
      id: 2,
      name: 'ABS пластик (1кг)',
      description: 'Прочный ABS филамент для профессиональной печати',
      price: 1800,
      category: 'materials',
      image: '🔧',
      inStock: true,
      features: ['Диаметр 1.75мм', 'Высокая прочность', 'Термостойкий']
    },
    {
      id: 3,
      name: 'PETG пластик (1кг)',
      description: 'Универсальный PETG для прочных изделий',
      price: 2000,
      category: 'materials',
      image: '💎',
      inStock: true,
      features: ['Диаметр 1.75мм', 'Влагостойкий', 'Ударопрочный']
    },
    {
      id: 4,
      name: '3D печать по модели',
      description: 'Печать вашей 3D модели на профессиональном оборудовании',
      price: 500,
      category: 'services',
      image: '🖨️',
      inStock: true,
      features: ['FDM/SLA печать', 'Срок 1-3 дня', 'Постобработка']
    },
    {
      id: 5,
      name: '3D моделирование',
      description: 'Создание 3D модели по вашим эскизам и чертежам',
      price: 2500,
      category: 'services',
      image: '📐',
      inStock: true,
      features: ['Техническое моделирование', 'Оптимизация', 'Чертежи']
    },
    {
      id: 6,
      name: 'Прототипирование',
      description: 'Разработка и печать функциональных прототипов',
      price: 3500,
      category: 'services',
      image: '⚙️',
      inStock: true,
      features: ['Полный цикл', 'Тестирование', 'Доработка']
    },
    {
      id: 7,
      name: 'Набор сопел 0.2-0.8мм',
      description: 'Комплект латунных сопел для 3D принтера',
      price: 800,
      category: 'parts',
      image: '🔩',
      inStock: true,
      features: ['5 размеров', 'Латунь', 'Для MK8']
    },
    {
      id: 8,
      name: 'Стеклянный стол 220x220',
      description: 'Стеклянная платформа для 3D принтера',
      price: 1200,
      category: 'parts',
      image: '🪟',
      inStock: true,
      features: ['Закаленное стекло', 'Ровная поверхность', 'Легкая очистка']
    },
    {
      id: 9,
      name: 'Смола для SLA (1л)',
      description: 'Фотополимерная смола для SLA/DLP печати',
      price: 4500,
      category: 'materials',
      image: '🧪',
      inStock: true,
      features: ['Высокая детализация', 'Быстрое отверждение', 'Разные цвета']
    }
  ];

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Grid3x3' },
    { id: 'materials', name: 'Материалы', icon: 'Palette' },
    { id: 'services', name: 'Услуги', icon: 'Wrench' },
    { id: 'parts', name: 'Запчасти', icon: 'Cog' }
  ];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const renderCatalog = () => {
    return (
      <div className="px-4 py-8 max-w-7xl mx-auto animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-heading bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent">
            LorinPrint3D
          </h1>
          <p className="text-xl text-muted-foreground">
            Магазин материалов и услуг 3D печати
          </p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat.id)}
              className={selectedCategory === cat.id ? 'bg-gradient-to-r from-primary to-yellow-600 text-black' : ''}
            >
              <Icon name={cat.icon} size={18} className="mr-2" />
              {cat.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 border-border bg-card">
              <CardHeader>
                <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">
                  {product.image}
                </div>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-muted-foreground">
                      <Icon name="Check" size={16} className="mr-2 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{product.price}₽</span>
                  {product.inStock && (
                    <Badge variant="outline" className="border-primary text-primary">
                      В наличии
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-yellow-600 hover:opacity-90 text-black font-semibold"
                  onClick={() => addToCart(product)}
                >
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderAbout = () => {
    return (
      <div className="px-4 py-8 max-w-4xl mx-auto animate-fade-in">
        <h2 className="text-4xl font-bold mb-8 font-heading">О нас</h2>
        <div className="space-y-6 text-lg text-muted-foreground">
          <p>
            <span className="bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent font-bold text-2xl">LorinPrint3D</span> — профессиональный магазин материалов и услуг для 3D печати.
          </p>
          <p>
            Мы предлагаем широкий ассортимент качественных материалов для FDM и SLA печати, 
            комплектующие для 3D принтеров, а также профессиональные услуги по печати и моделированию.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="text-center border-primary/20">
              <CardHeader>
                <div className="text-4xl mb-2">🏆</div>
                <CardTitle className="text-primary">500+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Довольных клиентов</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20">
              <CardHeader>
                <div className="text-4xl mb-2">⚡</div>
                <CardTitle className="text-primary">24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Быстрая доставка</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20">
              <CardHeader>
                <div className="text-4xl mb-2">✨</div>
                <CardTitle className="text-primary">100%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Качество товаров</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const renderContacts = () => {
    return (
      <div className="px-4 py-8 max-w-3xl mx-auto animate-fade-in">
        <h2 className="text-4xl font-bold mb-8 font-heading">Контакты</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="MapPin" className="mr-2 text-primary" size={24} />
                Адрес
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">г. Москва, ул. 3D Печати, д. 123</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Phone" className="mr-2 text-primary" size={24} />
                Телефон
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">+7 (999) 123-45-67</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Mail" className="mr-2 text-primary" size={24} />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">info@lorinprint3d.ru</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Clock" className="mr-2 text-primary" size={24} />
                Режим работы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Пн-Пт: 9:00 - 20:00<br/>Сб-Вс: 10:00 - 18:00</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 border-primary/20">
          <CardHeader>
            <CardTitle>Написать нам</CardTitle>
            <CardDescription>Есть вопросы? Оставьте сообщение и мы свяжемся с вами</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input id="name" placeholder="Ваше имя" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <Label htmlFor="message">Сообщение</Label>
                <Textarea id="message" placeholder="Ваше сообщение..." rows={4} />
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-yellow-600 text-black font-semibold hover:opacity-90">
                Отправить
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('catalog')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-yellow-600 flex items-center justify-center">
              <Icon name="Printer" className="text-black" size={20} />
            </div>
            <span className="text-xl font-bold font-heading">LorinPrint3D</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Button
              variant={activeSection === 'catalog' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('catalog')}
              className={activeSection === 'catalog' ? 'bg-gradient-to-r from-primary to-yellow-600 text-black' : ''}
            >
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Каталог
            </Button>
            <Button
              variant={activeSection === 'about' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('about')}
              className={activeSection === 'about' ? 'bg-gradient-to-r from-primary to-yellow-600 text-black' : ''}
            >
              О нас
            </Button>
            <Button
              variant={activeSection === 'contacts' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('contacts')}
              className={activeSection === 'contacts' ? 'bg-gradient-to-r from-primary to-yellow-600 text-black' : ''}
            >
              Контакты
            </Button>
          </nav>

          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-primary to-yellow-600 text-black border-0">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
                <SheetDescription>
                  {cart.length === 0 ? 'Ваша корзина пуста' : `Товаров: ${cart.length}`}
                </SheetDescription>
              </SheetHeader>
              
              {cart.length > 0 ? (
                <div className="mt-8 space-y-4">
                  <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                    {cart.map(item => (
                      <Card key={item.id} className="border-border">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="text-3xl">{item.image}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-primary font-bold">{item.price}₽</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="Trash2" size={16} className="text-destructive" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Итого:</span>
                      <span className="text-2xl font-bold text-primary">{getTotalPrice()}₽</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="customer-name">Ваше имя</Label>
                        <Input id="customer-name" placeholder="Иван Иванов" />
                      </div>
                      <div>
                        <Label htmlFor="customer-phone">Телефон</Label>
                        <Input id="customer-phone" placeholder="+7 (999) 123-45-67" />
                      </div>
                      <div>
                        <Label htmlFor="customer-email">Email</Label>
                        <Input id="customer-email" type="email" placeholder="your@email.com" />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-yellow-600 text-black font-semibold hover:opacity-90">
                        <Icon name="CreditCard" size={18} className="mr-2" />
                        Оформить заказ
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground">
                  <Icon name="ShoppingCart" size={64} className="mb-4 opacity-50" />
                  <p>Добавьте товары в корзину</p>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main>
        {activeSection === 'catalog' && renderCatalog()}
        {activeSection === 'about' && renderAbout()}
        {activeSection === 'contacts' && renderContacts()}
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container px-4 text-center text-muted-foreground">
          <p className="text-sm">© 2024 LorinPrint3D. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
