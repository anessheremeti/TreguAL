import Navbar from "../../components/Navbar/index";
import React from "react";
import shopbag from "../../assets/Give Shop.png";
import mouse from "../../assets/245b92b43d3cf7e3455d868c53712c92017165b2.jpg";
import headphones from "../../assets/39c814ecb335f48a1f47ec0d5c189d6d04565b19.jpg";
import joystick from "../../assets/2a82f7e2002671a521f1065c30d1204ca27b1f3c.png";
import setup from "../../assets/eaa8a751557729681da438b4ee78bade44f2d68d.jpg";
import chair from "../../assets/fce601546a922fd57d90acaae064908f96cf2bc6.png";
import computer from "../../assets/4239312734fe89cb36e5ab2c79b5115290f126c5.png";
import monitor from "../../assets/a0af9d63deb24888bacceed0133091cd21da1c82.png";
import man from "../../assets/Dono da proposta.png";
import woman from "../../assets/Autor da proposta.png";
// import logo from "../../assets/8df3bd592c22da650b58b166b08590f8ca1cbb49.png";
import Footer from "../../components/Footer/index";
const HomePage = () => {
  return (
    <div className="">
      <Navbar />
      <div className="first_section  w-full flex flex-col  mx-auto my-0 items-center justify-center pt-24">
        <div className="img_and_content flex text-center text-white">
          <div className="logo absolute top-[28%] left-[22%] z-[-99]">
            <img className="w-[40%]" src={shopbag} alt="shopbag" />
          </div>
          <div className="flex flex-col">
            <p className="text-4xl">
              Fuqizo Stilin Tënd të Jetës me Zgjedhje të Zgjuara
            </p>
            <p className="text-sm max-w-[50%] mx-auto mt-9">
              Zbulo një botë mundësish – nga teknologjia dhe mobiliet, te
              aksesorët, veshjet, dhe shumë më tepër. Blej, shis ose gjej çdo
              gjë që të duhet në një vend të vetëm.
            </p>
            <div className="pt-6">
              <button className="border border- hover:cursor-pointer border-white py-2.5 px-11 ">
                Shiko më shumë
              </button>
            </div>
          </div>
        </div>
        <p className="text-white pt-24 text-3xl">Produktet e Javës</p>
        <p className="text-white pt-3.5 text-center">
          {" "}
          Përzgjedhjet më të pëlqyera dhe më të kërkuara këtë javë. Zbulo
          ofertat që nuk duhen humbur!
        </p>

        <div class="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-7">
          <div class="bg-[#12132a] rounded-xl border-2  border-[#8b5cf6] transition-all duration-300 p-6 flex flex-col items-center shadow-lg shadow-black/40">
            <div class="w-full aspect-square overflow-hidden rounded-md mb-6">
              <img
                src={mouse}
                alt="Logitech PRO X Mouse"
                class="object-cover w-full h-full"
              />
            </div>
            <p class="text-sm text-gray-300 text-center mb-2">
              Logitech PRO X Rechargeable Wireless
            </p>
            <p class="text-lg font-semibold tracking-wide text-gray-100">
              $ 160.00
            </p>
          </div>

          <div class="bg-[#12132a] rounded-xl border-2 border-[#8b5cf6] transition-all duration-300 p-6 flex flex-col items-center shadow-lg shadow-black/40">
            <div class="w-full aspect-square overflow-hidden rounded-md mb-6">
              <img
                src={headphones}
                alt="Logitech PRO X Headset"
                class="object-cover w-full h-full"
              />
            </div>
            <p class="text-sm text-gray-300 text-center mb-2">
              Logitech PRO X Gaming Headset
            </p>
            <p class="text-lg font-semibold tracking-wide text-gray-100">
              $ 223.00
            </p>
          </div>

          <div class="bg-[#12132a] rounded-xl border-2 border-[#8b5cf6] transition-all duration-300 p-6 flex flex-col items-center shadow-lg shadow-black/40">
            <div class="w-full aspect-square overflow-hidden rounded-md mb-6">
              <img
                src={joystick}
                alt="PS4 Controller"
                class="object-cover w-full h-full"
              />
            </div>
            <p class="text-sm text-gray-300 text-center mb-2">
              PS4 PlayStation 4 Dualshock Wireless Controller Black
            </p>
            <p class="text-lg font-semibold tracking-wide text-emerald-400">
              $ 79.00
            </p>
          </div>
        </div>
        <p className="text-sm text-white max-w-[35%] mx-auto mt-9 text-center">
          Nga pajisjet elektronike e pajisjet e shtëpisë, te veshjet, lodrat,
          aksesorët e makinave apo produktet e kujdesit personal — çdo kategori
          është menduar për të plotësuar stilin dhe nevojat e tua të përditshme.
          Blej me siguri, krahaso me lehtësi dhe përfito më shumë çdo ditë!
        </p>
        <div className="pt-6">
          <button className="border hover:cursor-pointer text-white border-solid border-white py-2.5 px-11 ">
            Shiko
          </button>
        </div>
      </div>
      <div className="mt-9">
        <img className="min-w-11/12 min-h-auto" src={setup} alt="" />
      </div>
      <div className="third_container flex flex-col text-white bg-linear-to-br from-[#0a0a0f] via-[#101028] to-[#1a1440] py-24 px-6 gap-32">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
          <div className="flex flex-col max-w-lg text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Karrige që kombinojnë stilin dhe rehatinë{" "}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              Punë, lojë apo relaks – gjej karrigen që përputhet me stilin tënd
              të jetesës. Modele ergonomike, materiale cilësore dhe dizajn
              modern që e kthejnë çdo hapësirë në një ambient komod dhe elegant.
            </p>
            <button className="inline-flex items-center justify-center hover:cursor-pointer gap-2 border border-gray-400 text-gray-100 px-8 py-2 rounded-md transition-all duration-300 hover:bg-white/10 hover:border-purple-400">
              Shiko me shume
              <span className="text-lg">→</span>
            </button>
          </div>
          <div className="relative inline-block rounded-2xl  mt-10  p-[3px] bg-linear-to-tr from-[#8b5cf6] via-[#7c3aed] to-[#06b6d4] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]">
            <img
              src={chair}
              alt="Gaming chair"
              className="rounded-2xl block w-full h-auto bg-[#0f0f1f] object-cover"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl w-full mx-auto ">
          <div className="relative rounded-2xl p-[3px] bg-linear-to-tr from-[#8b5cf6] via-[#7c3aed] to-[#06b6d4] shadow-[0_0_35px_rgba(139,92,246,0.4)] transition-transform duration-500 hover:scale-[1.02]">
            <img
              src={computer}
              alt="Gaming setup table"
              className="rounded-2xl w-full h-full object-cover max-h-76 bg-[#0f0f1f]"
            />
          </div>

          <div className="flex flex-col justify-center lg:pl-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Tavolina që frymëzojnë produktivitet dhe stil
            </h2>
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
              Nga tavolinat për punë në shtëpi te ato për setup-e gaming, çdo
              detaj është menduar për funksionalitet, rehati dhe pamje të
              sofistikuar. Krijo hapësirën tënde perfekte me tavolina që
              përshtaten me ritmin tënd.
            </p>
            <button className="relative inline-flex items-center justify-center gap-2 hover:cursor-pointer border border-gray-400 text-gray-100 px-6 py-2 rounded-md transition-all duration-300 hover:bg-white/10 hover:border-purple-400 content-center">
              Shiko më shumë
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl w-full mx-auto ">
          <div className="flex flex-col justify-center lg:pr-10 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Ndriço ambientin me elegancë moderne
            </h2>
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
              Ndriçues që sjellin atmosferë, stil dhe funksionalitet. Nga
              llambat minimaliste deri te dritat LED me dizajn inovativ — çdo
              produkt është zgjedhur për të përmirësuar ndjesinë dhe komoditetin
              në çdo hapësirë.
            </p>
            <button className="relative inline-flex items-center gap-2 hover:cursor-pointer border border-gray-400 text-gray-100 px-6 py-2 rounded-md transition-all duration-300 hover:bg-white/10 hover:border-purple-400 content-center">
              Shiko më shumë
              <span className="text-lg">→</span>
            </button>
          </div>

          <div className="relative rounded-2xl p-[3px] bg-linear-to-tr from-[#8b5cf6] via-[#7c3aed] to-[#06b6d4] shadow-[0_0_35px_rgba(139,92,246,0.4)] transition-transform duration-500 hover:scale-[1.02] order-1 lg:order-2">
            <img
              src={monitor}
              alt="Lamp setup"
              className="rounded-2xl w-full h-full object-cover max-h-76 bg-[#0f0f1f]"
            />
          </div>
        </div>
      </div>
      <section className="bg-black  p-5">
        <p className="text-white text-2xl text-center">
          Bli thjeshtë, shpejt dhe me besim – gjithçka që kërkon në një vend.”
        </p>
      </section>

      <main className="relative flex flex-col lg:flex-row items-center min-h-screen w-full bg-[#080812] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-[-20%] top-[-10%] h-[50%] w-[80%] rounded-full bg-linear-to-br from-fuchsia-900/40 to-transparent blur-3xl"></div>
          <div className="absolute top-0 right-[-20%] bottom-[-10%] h-[50%] w-[80%] rounded-full bg-linear-to-tl from-indigo-900/40 to-transparent blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          <div className="w-full lg:w-[55%] flex justify-center lg:justify-start">
            <div className="relative w-full max-w-xl p-4 sm:p-8">
              <div className="absolute top-0 left-0 w-[95%] h-[95%] border-l-2 border-t-2 border-fuchsia-500/50 rounded-tl-3xl shadow-[0_0_20px_rgba(192,38,211,0.3)]"></div>
              <div className="absolute bottom-0 right-0 w-[95%] h-[95%] border-b-2 border-r-2 border-fuchsia-500/50 rounded-br-3xl shadow-[0_0_20px_rgba(192,38,211,0.3)]"></div>

              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <span className="text-[10rem] lg:text-[12rem] font-black text-white/5 select-none -translate-x-4 tracking-widest">
                  arado
                </span>
              </div>

              <div className="relative z-10 space-y-6 text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-gray-100">
                  Çoje përvojën tënde të blerjes në një
                </h1>
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-extrabold uppercase tracking-tighter">
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 to-purple-500">
                    nivel
                  </span>
                  <span className="ml-2 sm:ml-4 bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-indigo-500">
                    tjetër!
                  </span>
                  <span className="text-fuchsia-500">!</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-300 max-w-md">
                  Zbulo një platformë moderne ku çdo produkt, çdo ofertë dhe çdo
                  porosi bëhet më e lehtë, më e shpejtë dhe më e mençur.{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
            <div className="relative h-[450px] w-full max-w-sm mx-auto lg:h-[550px] lg:max-w-md">
              <div className="absolute top-0 right-0 w-3/5 sm:w-[280px] transition-transform duration-300 ease-in-out hover:scale-105">
                <div className="p-1.5 bg-linear-to-br from-purple-600 via-fuchsia-500 to-indigo-500 rounded-[2.5rem] shadow-2xl shadow-purple-500/30">
                  <img
                    src={man}
                    alt="Professional man in a turtleneck"
                    className="w-full h-full object-cover rounded-[2.25rem]"
                  />
                </div>
              </div>

              <div className="absolute bottom-10 sm:bottom-0 left-0 w-1/2 sm:w-[250px] transition-transform duration-300 ease-in-out hover:scale-105">
                <div className="p-1.5 bg-white rounded-[2.5rem] shadow-2xl shadow-blue-500/20">
                  <img
                    src={woman}
                    alt="Professional woman in a blazer"
                    className="w-full h-full object-cover rounded-[2.25rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default HomePage;
