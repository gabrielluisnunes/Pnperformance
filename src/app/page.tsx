'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Form, Button, Row, Col } from 'react-bootstrap';

interface CustomWindow extends Window {
    Swiper: any; 
}

declare const window: CustomWindow; 

const services = [
    { 
        title: "Gestão de Anúncios", 
        description: "Campanhas no Google e Meta focadas em leads qualificados.", 
        icon: "📈" 
    },
    { 
        title: "Landing Pages que Convertem", 
        description: "Páginas estratégicas para transformar seus cliques em clientes.", 
        icon: "🖥️" 
    },
    { 
        title: "Google Meu Negócio", 
        description: "Aumentamos sua visibilidade local e atração de clientes.", 
        icon: "📍" 
    },
    { 
        title: "Chatbot IA no WhatsApp", 
        description: "Atendimento via WhatsApp com IA, 24 horas por dia.", 
        icon: "🤖" 
    },
    { 
        title: "Gestão de Social Media", 
        description: "Fortalecemos sua marca com conteúdo consistente.", 
        icon: "📱" 
    },
    { 
        title: "Relatórios em Tempo Real", 
        description: "Transparência total: acompanhe seus resultados em tempo real.", 
        icon: "📊" 
    },
];

const pillars = [
    { icon: "⭐", title: "Estratégia e Planejamento", description: "Planejamento de funil de vendas e jornada de compra para o público ideal." },
    { icon: "📈", title: "Execução de Alta Performance", description: "Otimização em tempo real (Google, Meta, TikTok) para maximizar seu CPA." },
    { icon: "📊", title: "Relatórios e Transparência", description: "Dashboards claros sobre ROI e faturamento. Total transparência no investimento." }
];

const logos = [
    { src: "/images/1.jpeg", alt: "Cliente 1" },
    { src: "/images/2.jpeg", alt: "Cliente 2" },
    { src: "/images/3.jpeg", alt: "Cliente 3" },
    { src: "/images/4.jpeg", alt: "Cliente 4" },
    { src: "/images/5.jpeg", alt: "Cliente 5" },
];

const WHATSAPP_NUMBER = "5545991272492"; 

export default function Home() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const sectionsRef = useRef<(HTMLElement | null)[]>([]);
    
    const servicesSwiperRef = useRef(null);
    const pilaresSwiperRef = useRef(null);
    const socialSwiperRef = useRef(null);

    const initializeSwipers = useCallback(() => {
        
        if (typeof window.Swiper !== 'undefined') {
            const Swiper = window.Swiper;

            if (servicesSwiperRef.current) {
                new Swiper(servicesSwiperRef.current, {
                    slidesPerView: 1.2, 
                    spaceBetween: 16,
                    loop: false,
                    autoHeight: false, 
                    pagination: {
                        el: '#services-pagination',
                        clickable: true,
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 'auto',
                            enabled: false,
                            spaceBetween: 0,
                        }
                    }
                });
            }

            if (pilaresSwiperRef.current) {
                new Swiper(pilaresSwiperRef.current, {
                    slidesPerView: 1.2,
                    spaceBetween: 16,
                    loop: false,
                    autoHeight: false, 
                    pagination: {
                        el: '#pilares-pagination',
                        clickable: true,
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 'auto',
                            enabled: false,
                            spaceBetween: 0,
                        }
                    }
                });
            }
            
            if (socialSwiperRef.current) {
                new Swiper(socialSwiperRef.current, {
                    slidesPerView: 'auto', 
                    centeredSlides: false,
                    spaceBetween: 20,
                    loop: true,
                    autoplay: {
                        delay: 3500,
                        disableOnInteraction: false,
                    },
                    breakpoints: {
                        768: {
                            enabled: false,
                            spaceBetween: 0,
                        }
                    }
                });
            }
        }
    }, []);

    useEffect(() => {
        const loadSwiperScript = () => {
            if (typeof window !== 'undefined' && !(document.querySelector('#swiper-script'))) {
                const script = document.createElement('script');
                script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
                script.id = 'swiper-script';
                script.onload = initializeSwipers;
                document.head.appendChild(script);
            } else if (typeof window !== 'undefined' && window.Swiper) {
                initializeSwipers();
            }
        };

        const loadSwiperStyle = () => {
            if (typeof window !== 'undefined' && !(document.querySelector('#swiper-style'))) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
                link.id = 'swiper-style';
                document.head.appendChild(link);
            }
        };

        loadSwiperStyle();
        loadSwiperScript();
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1
        });

        sectionsRef.current.forEach(section => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
             observer.disconnect();
        };

    }, [initializeSwipers]);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('loading');
        
        const form = event.currentTarget;
        const data = new FormData(form);
        
        const nome = data.get('nome') as string;
        const empresa = data.get('empresa') as string;
        const whatsapp = data.get('whatsapp') as string;

        const message = encodeURIComponent(
            `Olá, PN Performance!\n\nMeu nome é ${nome} da empresa ${empresa}.\nMeu WhatsApp é ${whatsapp}.\n\nGostaria de solicitar o Diagnóstico Gratuito.`
        );

        const whatsappUrl = `https://wa.me/${5545991272492}?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
        
        setTimeout(() => {
            setStatus('success');
            form.reset();
        }, 1000);
    };

    const addRef = (el: HTMLElement | null) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    return (
        <main>
            <style jsx global>{`
                      body {
                          overflow-x: hidden;
                      }

                      .bg-dark-section {
                          color: white !important; 
                      }
                      
                      .service-card, .card.h-100 {
                          min-height: 250px; 
                          height: 100%; 
                          padding: 2rem;
                          background-color: #1f2937; 
                          border-radius: 12px;
                          display: flex; 
                          flex-direction: column;
                      }
                      
                      
                      #home {
                          min-height: 90vh;
                          background-image: linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.85)), url(/images/banner.png);
                          background-repeat: no-repeat;
                          background-position: center center;
                          background-size: cover;
                      }

                     
                      @media (max-width: 767px) {
                          #home {
                              min-height: 70vh; 
                              background-image: linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.85)), url(/images/bannermobile.png); 
                              background-position: center top; 
                              background-size: cover; 
                          }

                          .swiper-container {
                              padding-left: 1rem; 
                              padding-right: 1rem; 
                              overflow: visible; 
                              height: auto; 
                          }
                          
                          .swiper-container .swiper-wrapper {
                              align-items: stretch; 
                          }

                          .swiper-container .swiper-slide {
                              height: 100% !important; 
                          }

                          .swiper-slide .service-card {
                              height: 100%; 
                          }
                          
                          .social-swiper-container {
                              padding: 0 1rem;
                          }
                          .social-swiper-container .swiper-slide {
                              width: auto; 
                              display: flex;
                              justify-content: center;
                              align-items: center;
                          }
                      }
                      
                      .animate-on-scroll {
                          opacity: 0;
                          transform: translateY(30px); 
                          transition: opacity 0.8s ease-out, transform 0.8s ease-out; 
                      }
                      .animate-on-scroll.animated {
                          opacity: 1;
                          transform: translateY(0);
                      }
              `}</style>
            
            <section 
                id="home"
                className="bg-navy text-white d-flex align-items-center bg-dark-section" 
                
            >
                <div className="container text-center py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-xl-8">
                            <h1 className="display-3 fw-bold mb-4 animate-on-scroll">
                                <span className="text-accent">Chega de Tráfego que Não Converte:</span> Performance de Mídia Paga com ROI Comprovado.
                            </h1>
                            <a 
                                href="#contato" 
                                className="btn btn-accent btn-lg mt-3 text-white fw-bold shadow-lg text-uppercase animate-on-scroll"
                                ref={addRef as any}
                            >
                                Quero Escalar Meu Negócio Agora!
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-4 bg-light text-center animate-on-scroll" ref={addRef as any}>
                <div className="container">
                    <h2 className="text-secondary mb-4 fs-6 text-uppercase fw-light">Resultados Entregues para Empresas em Destaque</h2>
                    
                    <Row className="justify-content-center align-items-center g-4 d-none d-md-flex">
                        {logos.map((logo, index) => (
                            <Col md={2} key={`logo-desktop-${index}`}>
                                <img 
                                    src={logo.src} 
                                    alt={logo.alt} 
                                    className="img-fluid" 
                                    style={{ maxHeight: '60px' }} 
                                />
                            </Col>
                        ))}
                    </Row>

                    <div className="d-md-none social-swiper-container">
                        <div className="swiper-container" ref={socialSwiperRef}>
                            <div className="swiper-wrapper py-2">
                                {logos.map((logo, index) => (
                                    <div 
                                        className="swiper-slide" 
                                        key={`logo-mobile-${index}`} 
                                    >
                                        <img 
                                            src={logo.src} 
                                            alt={logo.alt} 
                                            className="img-fluid" 
                                            style={{ maxHeight: '60px' }} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-navy bg-dark-section animate-on-scroll" ref={addRef as any}> 
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-6 mb-2">Serviços que fazem parte da nossa assessoria</h2>
                        <p className="lead text-white-50">Tudo incluso na nossa assessoria mensal sem complicações.</p>
                    </div>

                    <Row className="g-4 justify-content-center d-none d-md-flex">
                        {services.map((service, index) => (
                            <Col md={6} lg={4} key={`service-desktop-${index}`}>
                                <div className="service-card h-100 shadow-lg">
                                    <div className="text-accent mb-3 fs-3">{service.icon}</div>
                                    <h3 className="h5 fw-bold mb-2">{service.title}</h3>
                                    <p className="text-white-50">{service.description}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    
                    <div className="d-md-none">
                        <div className="swiper-container" ref={servicesSwiperRef}> 
                            <div className="swiper-wrapper py-3">
                                {services.map((service, index) => (
                                    <div 
                                        className="swiper-slide" 
                                        key={`service-mobile-${index}`} 
                                        style={{ width: '80%' }} 
                                    >
                                        <div className="service-card shadow-lg"> 
                                            <div className="text-accent mb-3 fs-3">{service.icon}</div>
                                            <h3 className="h5 fw-bold mb-2">{service.title}</h3>
                                            <p className="text-white-50">{service.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="swiper-pagination mt-4" id="services-pagination"></div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="py-5 animate-on-scroll" ref={addRef as any}>
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold">Nossa Estrutura, Seu Crescimento.</h2>
                    <p className="text-center lead mb-5 text-muted">A PN Performance atua em três pilares essenciais para garantir que cada centavo investido retorne com lucro.</p>
                    
                    <Row className="g-4 d-none d-md-flex">
                        {pillars.map((pillar, index) => (
                            <Col md={4} key={`pillar-desktop-${index}`}>
                                <div className="service-card h-100 shadow-sm border-0 p-4 text-center"> 
                                    <div className="text-accent mb-3 fs-1">{pillar.icon}</div>
                                    <h3 className="h5 fw-bold card-title">
                                        <span className='text-white'>{pillar.title}</span> 
                                    </h3>
                                    <p className="card-text text-white-50">{pillar.description}</p> 
                                </div>
                            </Col>
                        ))}
                    </Row>

                    <div className="d-md-none">
                        <div className="swiper-container" ref={pilaresSwiperRef}>
                            <div className="swiper-wrapper py-3">
                                {pillars.map((pilar, index) => (
                                    <div 
                                        className="swiper-slide" 
                                        key={`pilar-mobile-${index}`} 
                                        style={{ width: '80%' }}
                                    >
                                        <div className="service-card shadow-sm border-0 p-4 text-center"> 
                                            <div className="text-accent mb-3 fs-1">{pilar.icon}</div>
                                            <h3 className="h5 fw-bold card-title">
                                                <span className='text-white'>{pilar.title}</span>
                                            </h3>
                                            <p className="card-text text-white-50">{pilar.description}</p> 
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="swiper-pagination mt-4" id="pilares-pagination"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-navy py-5 bg-dark-section animate-on-scroll" ref={addRef as any}> 
                <div className="container text-center">
                    <h2 className="fw-bold mb-3">Pronto para Ver Seu Dinheiro Trabalhar de Verdade?</h2>
                    <p className="lead mb-4 text-white-50">Fale com o Vini, especialista que estará à frente do seu projeto.</p>
                    <a 
                        href="#contato" 
                        className="btn btn-accent btn-lg fw-bold shadow-sm text-white" 
                    >
                        Falar com nossa equipe
                    </a>
                </div>
            </section>
            
            <section id="contato" className="py-5 bg-light animate-on-scroll" ref={addRef as any}>
                <div className="container">
                    <Row className="justify-content-center">
                        <Col md={8} lg={6}>
                            <h2 className="text-center mb-4 fw-bold">Dê o Primeiro Passo: Diagnóstico Gratuito</h2>
                            <p className="text-center text-muted mb-4">Preencha e envie para iniciar uma conversa imediata no WhatsApp. Atendimento em tempo real!</p>
                            
                            <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg bg-white">
                                <h4 className="mb-4 text-center text-accent fw-bold">Fale Conosco via WhatsApp</h4>
                                {status === 'success' && (
                                    <div className="alert alert-success text-center">
                                        <h5 className="mb-0">✅ Redirecionando para o WhatsApp...</h5>
                                        <small>Sua mensagem foi pré-preenchida. Basta enviar!</small>
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="alert alert-danger text-center">
                                        ❌ Erro ao enviar. Tente novamente ou chame diretamente o Vini!
                                    </div>
                                )}
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="nome">Nome Completo</Form.Label>
                                    <Form.Control type="text" id="nome" name="nome" placeholder="Seu nome" required disabled={status === 'loading'} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="empresa">Nome da Empresa</Form.Label>
                                    <Form.Control type="text" id="empresa" name="empresa" placeholder="Sua empresa" required disabled={status === 'loading'} />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label htmlFor="whatsapp">WhatsApp</Form.Label>
                                    <Form.Control type="tel" id="whatsapp" name="whatsapp" placeholder="(XX) XXXXX-XXXX" required disabled={status === 'loading'} />
                                </Form.Group>
                                <Button 
                                    type="submit" 
                                    variant="custom" 
                                    className="btn-accent w-100 btn-lg fw-bold"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.05A.5.5 0 0 0 .043 5.371l.745 3.328A.5.5 0 0 0 1.258 9.07l.872-.083 8.356-4.296L7.498 12.33a.5.5 0 0 0 .151.724l.43.255 3.016 1.778a.5.5 0 0 0 .7.027l7.55-7.55a.5.5 0 0 0 .027-.7z"/>
                                            </svg>
                                            Iniciar Conversa no WhatsApp
                                        </>
                                    )}
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </section>

            <footer className="bg-navy text-white-50 py-4 bg-dark-section"> 
                <div className="container text-center">
                    <p className="mb-0">&copy; {new Date().getFullYear()} PN Performance Mídia. Todos os direitos reservados.</p>
                    <small className="d-block mt-1">CNPJ: 00.000.000/0001-00 | <Link href="#" className="text-white-50 text-decoration-none">Política de Privacidade</Link></small>
                </div>
            </footer>
        </main>
    );
}