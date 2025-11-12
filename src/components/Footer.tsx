import Link from 'next/link';
import { FaFacebookF, FaInstagram } from 'react-icons/fa'; 

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61576695808195&locale=pt_BR"; 
const INSTAGRAM_URL = "https://www.instagram.com/pnmidiagestao/"; 

const Footer = () => {
    return (
        
        <footer className="bg-navy text-white-50 py-4 bg-dark-section"> 
            <div className="container text-center">
                
                {}
                <div className="d-flex justify-content-center mb-3">
                    <a 
                        className="btn btn-outline-light btn-social mx-2" 
                        href={INSTAGRAM_URL} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <FaInstagram size={18} /> 
                    </a>
                    <a 
                        className="btn btn-outline-light btn-social mx-2" 
                        href={FACEBOOK_URL} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <FaFacebookF size={18} /> 
                    </a>
                </div>
                
                {}
                <p className="mb-0">&copy; {new Date().getFullYear()} PN Performance Mídia. Todos os direitos reservados.</p>
                <small className="d-block mt-1">
                    CNPJ: 00.000.000/0001-00 | 
                    <Link href="#" className="text-white-50 text-decoration-none" style={{ marginLeft: '5px' }}>
                        Política de Privacidade
                    </Link>
                </small>
            </div>
        </footer>
    );
};

export default Footer;