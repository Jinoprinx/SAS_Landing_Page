import { useEffect, useState } from 'react';
import { Link as LinkScroll } from 'react-scroll';
import { clsx } from 'clsx';
import PropTypes from 'prop-types';

const Header = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Fixed useEffect - removed unused 'effect' parameter
    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 32);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Added empty dependency array for proper cleanup

    const NavLink = ({ title }) => (
        <LinkScroll 
            onClick={() => setIsOpen(false)} 
            to={title} 
            offset={-100} 
            spy 
            smooth 
            activeClass='nav-active' 
            className='base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5'
        >
            {title}
        </LinkScroll>
    );

    NavLink.propTypes = {
        title: PropTypes.string.isRequired,
    };
    
    return (
        <header className={clsx(
            'fixed top-0 left-0 z-50 w-full py-10 transition-all duration-500 max-lg:py-4', 
            hasScrolled && 'py-2 bg-black-100 backdrop-blur-[8px]' // Fixed typo: backdrop-blus -> backdrop-blur
        )}>
            <div className="container flex h-14 items-center max-lg:px-5">
                <a className="lg:hidden flex-1 cursor-pointer z-2">
                    <img src="/images/vilo.svg" width={115} height={55} alt="logo"/>
                </a>
                <div className={clsx(
                    'w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:bg-s2 max-lg:opacity-0', 
                    isOpen ? 'max-lg:opacity-100' : 'max-lg:pointer-events-none'
                )}>
                    <div className="w-full max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:overflow-hidden max-lg:p-6 sidebar-before max-md:px-4">
                        <nav className='max-lg:relative max-lg:z-2 max-lg:my-auto'>
                            <ul className="flex max-lg:block max-lg:px-12">
                                <li className="nav-li">
                                    <NavLink title="features" />
                                    <div className='dot' />
                                    <NavLink title="pricing" />
                                </li>
                                <li className='nav-logo'>
                                    <LinkScroll 
                                        to='hero' 
                                        offset={-240} 
                                        spy 
                                        smooth 
                                        className={clsx('max-lg:hidden transition-transform duration-500 cursor-pointer')}
                                    >
                                        <img src="/images/vilo.svg" width={150} height={40} alt="" />
                                    </LinkScroll>
                                </li>
                                <li className='nav-li'>
                                    <NavLink title="faq" />
                                    <div className='dot'></div>
                                    <NavLink title='download' />
                                </li>
                            </ul>
                        </nav>
                        <div className='lg-hidden block absolute top-1/2 left-0 w-[960px] h-[380px] translate-x-[-290px] -translate-y-1/2  rotate-90'>
                            <img src="/images/bg-outlines.svg" width={960} height={380} alt="outlines" className='relative z-2'  />
                            <img src="/images/bg-outlines-fill.png" width={960} height={380} alt="outline-fill" className='absolute inset-0 mix-blend-soft-light opacity-5'/>
                        </div>
                    </div>
                </div>
                <button 
                    className='lg:hidden z-2 size-7 border-1 border-s4/20 rounded-full flex justify-center' 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <img className='size-6 object-contain justify-center' src='./images/close.svg' alt="Close menu"/>
                    ) : (
                        <img src='./images/magic.svg' alt='Open menu' className='size-6 object-contain justify-center'/>
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;