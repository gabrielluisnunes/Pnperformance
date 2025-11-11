'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { SendFill } from 'react-bootstrap-icons'; 

const services = [
    { 
        title: "Gestão de Anúncios", 
        description: "Campanhas no Google & Meta otimizadas para gerar leads qualificados.", 
        icon: "📈" 
    },
    { 
        title: "Landing Pages que Convertem", 
        description: "Páginas rápidas e estratégicas, feitas para transformar cliques em clientes.", 
        icon: "🖥️" 
    },
    { 
        title: "Google Meu Negócio", 
        description: "Mais visibilidade local para atrair clientes prontos para fechar.", 
        icon: "📍" 
    },
    { 
        title: "Chatbot IA no WhatsApp", 
        description: "Atendimento automático e personalizado 24 horas por dia.", 
        icon: "🤖" 
    },
    { 
        title: "Gestão de Social Media", 
        description: "Conteúdo consistente que fortalece a presença digital da sua marca.", 
        icon: "📱" 
    },
    { 
        title: "Criativos Profissionais", 
        description: "Imagens e vídeos de alto impacto para aumentar cliques e conversões.", 
        icon: "🎥" 
    },
    { 
        title: "Relatórios em Tempo Real", 
        description: "Total transparência: acompanhe seus resultados a qualquer momento.", 
        icon: "📊" 
    },
];

const WHATSAPP_NUMBER = "5511999999999"; 

export default function Home() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const sectionsRef = useRef<(HTMLElement | null)[]>([]);

    const setupIntersectionObserver = useCallback(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sectionsRef.current.forEach(section => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setupIntersectionObserver();
    }, [setupIntersectionObserver]);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('loading');
        
        const form = event.currentTarget;
        const data = new FormData(form);
        
        const nome = data.get('nome') as string;
        const empresa = data.get('empresa') as string;
        const whatsapp = data.get('whatsapp') as string;

        const message = encodeURIComponent(
            `Olá, PN Performance!\n\nMeu nome é *${nome}* da empresa *${empresa}*.\nMeu WhatsApp é *${whatsapp}*.\n\nGostaria de solicitar o Diagnóstico Gratuito.`
        );

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        
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
            <section 
                id="home"
                className="bg-navy text-white d-flex align-items-center" 
                style={{ minHeight: '90vh', background: 'linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.85)), url(/images/hero-bg.jpg) no-repeat center center', backgroundSize: 'cover' }}
            >
                <div className="container text-center py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-xl-8">
                            <h1 className="display-3 fw-bold mb-4 animate-on-scroll">
                                <span className="text-accent">Chega de Tráfego que Não Converte:</span> Performance de Mídia Paga com ROI Comprovado.
                            </h1>
                            <p className="lead mb-4 animate-on-scroll" ref={addRef as any}>
                                Somos a PN Performance, a agência que une estratégia e tecnologia para transformar investimento em faturamento. Se o seu objetivo é escalar resultados, você está no lugar certo.
                            </p>
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
                    <Row className="justify-content-center align-items-center g-4">
                        <Col xs={4} md={2}><img src="/images/logo-placeholder.png" alt="Cliente 1" className="img-fluid opacity-50" style={{ maxHeight: '40px' }} /></Col>
                        <Col xs={4} md={2}><img src="/images/logo-placeholder.png" alt="Cliente 2" className="img-fluid opacity-50" style={{ maxHeight: '40px' }} /></Col>
                        <Col xs={4} md={2}><img src="/images/logo-placeholder.png" alt="Cliente 3" className="img-fluid opacity-50" style={{ maxHeight: '40px' }} /></Col>
                        <Col xs={4} md={2} className="d-none d-md-block"><img src="/images/logo-placeholder.png" alt="Cliente 4" className="img-fluid opacity-50" style={{ maxHeight: '40px' }} /></Col>
                    </Row>
                </div>
            </section>

            <section className="py-5 bg-navy text-white animate-on-scroll" ref={addRef as any}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-6 mb-2">Serviços que fazem parte da nossa assessoria</h2>
                        <p className="lead text-white-50">Tudo incluso na nossa assessoria mensal sem complicações.</p>
                    </div>

                    <Row className="g-4 justify-content-center">
                        {services.map((service, index) => (
                            <Col md={6} lg={4} key={index}>
                                <div className="service-card shadow-lg">
                                    <div className="text-accent mb-3 fs-3">{service.icon}</div>
                                    <h3 className="h5 fw-bold mb-2">{service.title}</h3>
                                    <p className="text-white-50">{service.description}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            <section className="py-5 animate-on-scroll" ref={addRef as any}>
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold">Nossa Estrutura, Seu Crescimento.</h2>
                    <p className="text-center lead mb-5 text-muted">A PN Performance atua em três pilares essenciais para garantir que cada centavo investido retorne com lucro.</p>
                    
                    <Row className="g-4">
                        <Col md={4}>
                            <div className="card h-100 shadow-sm border-0 p-4 text-center">
                                <div className="text-accent mb-3 fs-1">⭐</div>
                                <h3 className="h5 fw-bold card-title">Estratégia e Planejamento</h3>
                                <p className="card-text text-muted">Não fazemos campanhas por fazer. Definimos o público ideal, o funil de vendas e a jornada de compra, garantindo que a mídia atinja o alvo certo.</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="card h-100 shadow-sm border-0 p-4 text-center">
                                <div className="text-accent mb-3 fs-1">📈</div>
                                <h3 className="h5 fw-bold card-title">Execução de Alta Performance</h3>
                                <p className="card-text text-muted">Especialistas em Google Ads, Meta Ads (Facebook e Instagram), TikTok e LinkedIn. Otimizamos em tempo real para maximizar o Custo por Aquisição (CPA).</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="card h-100 shadow-sm border-0 p-4 text-center">
                                <div className="text-accent mb-3 fs-1">📊</div>
                                <h3 className="h5 fw-bold card-title">Relatórios e Transparência</h3>
                                <p className="card-text text-muted">Acesso a dashboards com dados claros sobre ROI e métricas. Você saberá exatamente como seu investimento está gerando faturamento. Sem letras miúdas.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            <section className="bg-accent text-white py-5 animate-on-scroll" ref={addRef as any}>
                <div className="container text-center">
                    <h2 className="fw-bold mb-3">Pronto para Ver Seu Dinheiro Trabalhar de Verdade?</h2>
                    <p className="lead mb-4">Fale com o Vini, especialista que estará à frente do seu projeto.</p>
                    <a 
                        href="#contato" 
                        className="btn btn-dark btn-lg fw-bold shadow-sm"
                    >
                        Falar com o Especialista (Sem Compromisso)
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
                                    <Form.Label>Nome Completa</Form.Label>
                                    <Form.Control type="text" id="nome" name="nome" placeholder="Seu nome" required disabled={status === 'loading'} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nome da Empresa</Form.Label>
                                    <Form.Control type="text" id="empresa" name="empresa" placeholder="Sua empresa" required disabled={status === 'loading'} />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>WhatsApp</Form.Label>
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
                                            <SendFill className="me-2" />
                                            Iniciar Conversa no WhatsApp
                                        </>
                                    )}
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </section>

            <footer className="bg-navy text-white-50 py-4">
                <div className="container text-center">
                    <p className="mb-0">&copy; {new Date().getFullYear()} PN Performance. Todos os direitos reservados.</p>
                    <small className="d-block mt-1">CNPJ: 00.000.000/0001-00 | <Link href="#" className="text-white-50 text-decoration-none">Política de Privacidade</Link></small>
                </div>
            </footer>
        </main>
    );
}