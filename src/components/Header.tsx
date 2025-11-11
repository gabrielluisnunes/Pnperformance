'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import Image from 'next/image'; 

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar 
      fixed="top" 
      expand="lg" 
      className={`py-3 transition duration-300 ease-in-out ${isScrolled ? 'bg-navy shadow-lg' : 'bg-transparent'}`}
      style={{ transition: 'background-color 0.3s, box-shadow 0.3s' }}
      data-bs-theme="dark" 
    >
      <Container>
        <Link 
          href="#home" 
          passHref 
          className="navbar-brand d-flex align-items-center" 
        >
          {}
          <Image
            src="/images/PN Performance Mídia.png" 
            alt="PN Performance Logo"
            width={35} 
            height={35} 
            className="me-2" 
          />
          {}
          {
            }
        </Link>
        
        <div className="d-flex ms-auto">
            <Link href="#contato" passHref className="d-none d-md-block">
                <Button 
                    variant="custom"
                    className="btn-accent fw-bold shadow-sm"
                >
                    Começar a Escalar
                </Button>
            </Link>

            <Link href="#contato" passHref className="d-md-none">
                <Button 
                    variant="custom"
                    className="btn-accent fw-bold shadow-sm"
                    size="sm"
                >
                    Escalar
                </Button>
            </Link>
        </div>
      </Container>
    </Navbar>
  );
}