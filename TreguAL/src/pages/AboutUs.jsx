import React from "react";
import BannerImage from "../assets/AboutUsImage.png";
import Navbar from "../components/Navbar/index";
import Footer from "../components/Footer/index";
import AboutUsvideo from "../assets/AboutUsvideo.mp4";

export default function AboutUs() {
  return (
    <>
      <Navbar />

      <section className="w-full bg-[#0f1020] py-10 px-4">
        {/* ================= BANNER ================= */}
        <div className="max-w-7xl mx-auto">
          <img
            src={BannerImage}
            alt="About us banner"
            className="w-full rounded-3xl object-cover shadow-lg"
          />
        </div>

        {/* ================= 4 COLUMNS BELOW BANNER ================= */}
        <div
          className="
        max-w-7xl mx-auto mt-10 mb-16 
        rounded-3xl 
        bg-gradient-to-r from-[#050509] via-[#151539] to-[#050509]
        px-8 py-10 
        grid grid-cols-1 md:grid-cols-4 gap-12 
        text-center text-white
      "
        >
          <FeatureBox title="Shope online" />
          <FeatureBox title="Free shipping" />
          <FeatureBox title="Return policy" />
          <FeatureBox title="PAYMENT" />
        </div>

        {/* ================= VIDEO + TEXT SECTION ================= */}
        <div className="w-full bg-[#151623] pb-20 text-white rounded-3xl max-w-7xl mx-auto">
          {/* VIDEO */}
          <div className="w-full">
            <video
              src={AboutUsvideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-t-3xl"
            ></video>
          </div>

          {/* TEXT + PROGRESS BARS */}
          <div className="px-6 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* LEFT TEXT */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Functionality meets perfection
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse massa libero, mattis volutpat id. Egestas adipiscing
                placerat eleifend a nascetur. Mattis proin enim, nam porttitor
                vitae.
              </p>
            </div>

            {/* RIGHT PROGRESS BARS */}
            <div className="space-y-6 max-w-md">
              <ProgressBar
                label="Creativity"
                percent={94}
                color="from-yellow-400 to-green-400"
              />

              <ProgressBar
                label="Advertising"
                percent={72}
                color="from-red-500 to-gray-400"
              />

              <ProgressBar
                label="Design"
                percent={84}
                color="from-yellow-500 to-green-500"
              />
            </div>
          </div>
        </div>

        {/* ================= LAST BLOG POST ================= */}
        <div className="max-w-7xl mx-auto py-20 text-white">
          <h2 className="text-3xl font-semibold mb-10">Last blog post</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <BlogCard
              img={"/mnt/data/722be94e-c8ee-42e8-b1c8-74ff16906fef.png"}
              title="Razer Blade 14 Gaming Laptop"
            />

            <BlogCard
              img={"/mnt/data/722be94e-c8ee-42e8-b1c8-74ff16906fef.png"}
              title="ASUS Zenbook 15 OLED 15.6” Laptop"
            />

            <BlogCard
              img={"/mnt/data/722be94e-c8ee-42e8-b1c8-74ff16906fef.png"}
              title="Nitro 5 Gaming Laptop"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function FeatureBox({ title }) {
  return (
    <div>
      <h3 className="text-lg md:text-xl font-semibold mb-3 text-white">
        {title}
      </h3>

      <p className="text-sm text-gray-300 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat dolor
        odio odio.
      </p>
    </div>
  );
}

function ProgressBar({ label, percent, color }) {
  return (
    <div>
      <div className="flex justify-between mb-1 text-sm md:text-base">
        <span>{label}</span>
        <span>{percent} %</span>
      </div>

      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-2 bg-gradient-to-r ${color} rounded-full`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

function BlogCard({ img, title }) {
  return (
    <div className=" rounded-xl shadow-md overflow-hidden flex flex-col text-center">
      <div className="w-full h-60 bg-white flex items-center justify-center">
        <img src={img} alt={title} className="w-full h-full object-contain" />
      </div>

      <div className="px-6 py-6 text-white ">
        <h3 className="font-semibold text-base md:text-lg mb-2">{title}</h3>

        <p className="text-sm text-gray-300 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <a
          href="/product"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          Read more
        </a>
      </div>
    </div>
  );
}
