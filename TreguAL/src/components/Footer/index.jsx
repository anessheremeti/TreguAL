
import logo from "../../assets/8df3bd592c22da650b58b166b08590f8ca1cbb49.png";
import React from "react";
const Footer = () => {
      const InstagramIcon = ({ className = 'w-6 h-6' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
          <radialGradient id="insta-gradient" cx="0.3" cy="1.2" r="1">
              <stop offset="0%" stopColor="#f9ce34" />
              <stop offset="25%" stopColor="#ee2a7b" />
              <stop offset="75%" stopColor="#6228d7" />
          </radialGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-1.082c-3.264 0-3.66.014-4.944.072-4.268.194-6.143 2.068-6.337 6.337-.058 1.283-.072 1.68-.072 4.944s.014 3.66.072 4.944c.194 4.268 2.068 6.143 6.337 6.337 1.283.058 1.68.072 4.944.072s3.66-.014 4.944-.072c4.268-.194 6.143-2.068 6.337-6.337.058-1.283.072-1.68.072-4.944s-.014-3.66-.072-4.944c-.194-4.268-2.068-6.143-6.337-6.337-1.283-.058-1.68-.072-4.944-.072z" fill="url(#insta-gradient)"/>
      <path d="M12 6.837c-2.848 0-5.163 2.315-5.163 5.163s2.315 5.163 5.163 5.163 5.163-2.315 5.163-5.163-2.315-5.163-5.163-5.163zm0 8.847c-2.033 0-3.684-1.651-3.684-3.684s1.651-3.684 3.684-3.684 3.684 1.651 3.684 3.684-1.651 3.684-3.684 3.684z" fill="url(#insta-gradient)"/>
      <circle cx="16.95" cy="7.05" r="1.25" fill="url(#insta-gradient)"/>
  </svg>
);

const FacebookIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
  </svg>
);

const TwitterIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.602.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
  </svg>
);

const LinkedInIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M20.447 20.452h-3.554V13.398c0-1.692-.031-3.866-2.355-3.866-2.358 0-2.718 1.842-2.718 3.746v7.174H8.269V8.927h3.414v1.561h.046c.477-.9 1.637-1.844 3.37-1.844 3.6 0 4.267 2.37 4.267 5.455v6.353zM5.337 7.433a2.062 2.062 0 11-2.063-2.065 2.064 2.064 0 012.063 2.065zm1.782 13.019H3.555V8.927h3.564v11.525zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
  </svg> );
    return (
<footer className="bg-[#212121] text-gray-400 py-16 px-4 sm:px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div>
            <img src={logo} />
            <h3 className="text-lg font-bold text-white mt-6 mb-4">Rreth Nesh</h3>
            <p className="text-sm">
Ne jemi një treg online ku çdo kush mund të blejë dhe të shesë me lehtësi.
Platforma jonë ofron shpejtësi, siguri dhe transparencë në çdo transaksion.
Çdo produkt, çdo ide, çdo nevojë – në një vend të vetëm.            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Informata</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pagesa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Per partneret</a></li>
            </ul>
          </div>

             <div>
            <h3 className="text-lg font-bold text-white mb-4">Rrjetet Sociale</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <InstagramIcon className="w-6 h-6 shrink-0" />
                <a href="#" className="ml-3 hover:text-white transition-colors">Instagram</a>
              </li>
              <li className="flex items-center">
                 <FacebookIcon className="w-6 h-6 text-[#1877F2] shrink-0" />
                <a href="#" className="ml-3 hover:text-white transition-colors">Facebook</a>
              </li>
               <li className="flex items-center">
                 <TwitterIcon className="w-6 h-6 shrink-0" />
                <a href="#" className="ml-3 hover:text-white transition-colors">Twitter</a>
              </li>
              <li className="flex items-center">
                 <LinkedInIcon className="w-6 h-6 text-[#0A66C2] shrink-0" />
                <a href="#" className="ml-3 hover:text-white transition-colors">LinkedIn</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-500 tracking-widest mb-4">Na kontaktoni</h3>
             <ul className="space-y-3 text-sm text-white">
              <li>+1 891 989-11-91</li>
              <li>hello@paradox.com</li>
            </ul>
          </div>
        </div>
      </footer>
    )

}
export default Footer;