import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: Review[];
}

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Футболка компрессионная PRO',
    price: 2490,
    category: 'Футболки',
    image: 'https://cdn.poehali.dev/projects/06c5ae85-0134-420a-a9d5-3cf737c330b3/files/13c59537-ce62-4615-96ef-3c3568ce48f5.jpg',
    rating: 4.9,
    reviews: [
      { id: 1, author: 'Дмитрий', rating: 5, text: 'Отличная компрессия, материал дышащий. Беру вторую!', date: '2025-10-20' },
      { id: 2, author: 'Игорь', rating: 5, text: 'Супер! Сидит как влитая, качество материала превосходное.', date: '2025-10-18' }
    ]
  },
  {
    id: 2,
    name: 'Шорты тренировочные SPORT',
    price: 1990,
    category: 'Шорты',
    image: 'https://cdn.poehali.dev/projects/06c5ae85-0134-420a-a9d5-3cf737c330b3/files/13c59537-ce62-4615-96ef-3c3568ce48f5.jpg',
    rating: 4.6,
    reviews: [
      { id: 3, author: 'Максим', rating: 5, text: 'Удобные, не стесняют движений. Рекомендую!', date: '2025-10-25' }
    ]
  },
  {
    id: 3,
    name: 'Брюки тактические DEFENDER',
    price: 4490,
    category: 'Брюки',
    image: 'https://cdn.poehali.dev/projects/06c5ae85-0134-420a-a9d5-3cf737c330b3/files/d0221457-d94b-4a78-a53b-02208d039582.jpg',
    rating: 4.8,
    reviews: [
      { id: 4, author: 'Сергей', rating: 5, text: 'Прочные, выдерживают любые нагрузки. Отличное качество!', date: '2025-10-22' },
      { id: 5, author: 'Виктор', rating: 5, text: 'Носил в походе, ткань не порвалась. Рекомендую!', date: '2025-10-18' }
    ]
  },
  {
    id: 4,
    name: 'Куртка тактическая ARMOUR',
    price: 7990,
    category: 'Куртки',
    image: 'https://cdn.poehali.dev/projects/06c5ae85-0134-420a-a9d5-3cf737c330b3/files/ddf2d13a-ae9c-44d1-8fba-fc1c89b05fbc.jpg',
    rating: 4.9,
    reviews: [
      { id: 6, author: 'Андрей', rating: 5, text: 'Лучшая куртка! Тепло, удобно, крепкая.', date: '2025-10-21' }
    ]
  },
  {
    id: 5,
    name: 'Худи AGGRESSION',
    price: 3990,
    category: 'Толстовки',
    image: 'https://cdn.poehali.dev/projects/06c5ae85-0134-420a-a9d5-3cf737c330b3/files/4b3c47e2-e8f8-4a4c-a9f1-705d01adf58d.jpg',
    rating: 4.7,
    reviews: [
      { id: 7, author: 'Михаил', rating: 5, text: 'Стильно и удобно, материал плотный!', date: '2025-10-19' }
    ]
  },
  {
    id: 6,
    name: 'Лонгслив POWER',
    price: 2790,
    category: 'Футболки',
    image: 'https://cdn.poehali.dev/projects/06c5ae85-0134-420a-a9d5-3cf737c330b3/files/13c59537-ce62-4615-96ef-3c3568ce48f5.jpg',
    rating: 4.8,
    reviews: [
      { id: 8, author: 'Роман', rating: 5, text: 'Отличная вещь для тренировок и повседневки!', date: '2025-10-17' }
    ]
  },
  {
    id: 7,
    name: 'Леггинсы компрессионные FLEX',
    price: 2990,
    category: 'Брюки',
    image: 'https://cdn.poehali.dev/projects/06c5ae85-0134-420a-a9d5-3cf737c330b3/files/d0221457-d94b-4a78-a53b-02208d039582.jpg',
    rating: 4.6,
    reviews: [
      { id: 9, author: 'Алексей', rating: 4, text: 'Хорошая компрессия, удобно сидят.', date: '2025-10-16' }
    ]
  },
  {
    id: 8,
    name: 'Ветровка спортивная STORM',
    price: 5490,
    category: 'Куртки',
    image: 'https://cdn.poehali.dev/projects/06c5ae85-0134-420a-a9d5-3cf737c330b3/files/ddf2d13a-ae9c-44d1-8fba-fc1c89b05fbc.jpg',
    rating: 4.9,
    reviews: [
      { id: 10, author: 'Владимир', rating: 5, text: 'Не промокает, отличная защита от ветра!', date: '2025-10-15' }
    ]
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Все товары');

  const categories = ['Все товары', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = activeCategory === 'Все товары' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon 
        key={i} 
        name={i < Math.floor(rating) ? "Star" : "Star"} 
        size={16} 
        className={i < Math.floor(rating) ? "fill-secondary text-secondary" : "fill-muted text-muted"}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ВЕПРЬ</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Sport & Aggression</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors font-medium">Каталог</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">О нас</a>
              <a href="#delivery" className="text-foreground hover:text-primary transition-colors font-medium">Доставка</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors font-medium">Контакты</a>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 items-center">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price.toLocaleString('ru-RU')} ₽</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                          </div>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      ))}
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Итого:</span>
                          <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent z-10" />
        <img 
          src="https://cdn.poehali.dev/projects/06c5ae85-0134-420a-a9d5-3cf737c330b3/files/48827a88-2c96-43ff-a3c8-0371c2f54676.jpg" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-4 z-20 relative">
          <div className="max-w-2xl animate-fade-in">
            <h2 className="text-6xl md:text-7xl font-bold mb-4 text-foreground">
              СИЛА И <span className="text-primary">АГРЕССИЯ</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
              Одежда, которая выдерживает любое напряжение
            </p>
            <Button size="lg" className="text-lg px-8 hover-scale">
              <Icon name="ArrowRight" size={20} className="mr-2" />
              В каталог
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Каталог товаров</h2>
          
          <Tabs defaultValue="Все товары" className="w-full" onValueChange={setActiveCategory}>
            <TabsList className="w-full justify-start mb-8 bg-background/50 flex-wrap h-auto">
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="data-[state=active]:bg-primary">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden hover-scale group cursor-pointer">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 right-4 bg-secondary">
                        {product.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <div className="flex items-center">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-sm">({product.reviews.length})</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</p>
                    </CardContent>
                    <CardFooter className="gap-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => addToCart(product)}
                      >
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Icon name="Eye" size={18} />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {selectedProduct && (
        <Sheet open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-2xl">{selectedProduct.name}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-80 object-cover rounded-lg"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {renderStars(selectedProduct.rating)}
                  <span className="font-bold">{selectedProduct.rating}</span>
                </div>
                <Badge variant="secondary">{selectedProduct.category}</Badge>
              </div>

              <div>
                <p className="text-4xl font-bold text-primary mb-4">
                  {selectedProduct.price.toLocaleString('ru-RU')} ₽
                </p>
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Добавить в корзину
                </Button>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold mb-4">Отзывы ({selectedProduct.reviews.length})</h3>
                <div className="space-y-4">
                  {selectedProduct.reviews.map(review => (
                    <Card key={review.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{review.author}</CardTitle>
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <CardDescription className="text-xs">
                          {new Date(review.date).toLocaleDateString('ru-RU')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{review.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">О нас</h2>
            <p className="text-lg text-muted-foreground mb-4">
              ВЕПРЬ — это бренд для тех, кто не идёт на компромиссы. Мы создаём одежду 
              для настоящих атлетов, которые знают цену силе и упорству.
            </p>
            <p className="text-lg text-muted-foreground">
              Наша одежда выдерживает любое напряжение. Качество проверено временем, дизайн создан для победителей. Присоединяйся к нашей команде!
            </p>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Доставка</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" size={32} className="text-primary" />
                </div>
                <CardTitle>Быстрая доставка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Доставка по России от 1 до 5 дней</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Gift" size={32} className="text-primary" />
                </div>
                <CardTitle>Бесплатно от 5000₽</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">При заказе от 5000₽ доставка бесплатна</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" size={32} className="text-primary" />
                </div>
                <CardTitle>Пункты выдачи</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Более 2500 пунктов выдачи по всей России</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Контакты</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Icon name="Phone" size={24} className="text-primary" />
                <a href="tel:+78001234567" className="text-xl hover:text-primary transition-colors">
                  8 (800) 123-45-67
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Icon name="Mail" size={24} className="text-primary" />
                <a href="mailto:info@vepr-sport.ru" className="text-xl hover:text-primary transition-colors">
                  info@vepr-sport.ru
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Icon name="MapPin" size={24} className="text-primary" />
                <p className="text-xl">Москва, ул. Спортивная, д. 1</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-primary-foreground" />
              </div>
              <div>
                <p className="font-bold">ВЕПРЬ</p>
                <p className="text-xs text-muted-foreground">Sport & Aggression</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 ВЕПРЬ. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}