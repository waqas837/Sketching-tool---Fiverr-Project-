import React from "react";

const packages = [
  {
    name: "الباقة الأساسية",
    price: "1 دينار كويتي",
    description: "الباقة الأساسية للعبة واحدة",
    borderColor: "border-pink-400",
    textColor: "text-pink-600",
    bgColor: "bg-white",
  },
  {
    name: "الباقة المتقدمة",
    price: "3 دينار كويتي",
    description: "باقة محسّنة مع ميزات إضافية",
    borderColor: "border-pink-500",
    textColor: "text-pink-700",
    bgColor: "bg-white",
  },
  {
    name: "الباقة الممتازة",
    price: "5 دينار كويتي",
    description: "باقة متميزة مع فوائد حصرية",
    borderColor: "border-pink-600",
    textColor: "text-pink-800",
    bgColor: "bg-white",
  },
  {
    name: "الباقة النهائية",
    price: "7 دينار كويتي",
    description: "الباقة النهائية مع جميع الميزات المتكاملة",
    borderColor: "border-pink-700",
    textColor: "text-pink-900",
    bgColor: "bg-white",
  },
];

const PackageCard = ({
  name,
  price,
  description,
  borderColor,
  textColor,
  bgColor,
}) => (
  <div
    className={`w-full max-w-xs ${bgColor} border ${borderColor} border-4 rounded-lg shadow-xl p-6 m-4 transition-transform transform hover:scale-105`}
  >
    <div className="flex flex-col items-center">
      <h2 className={`text-2xl font-semibold mb-2 ${textColor}`}>{name}</h2>
      <p className={`text-3xl font-bold mb-4 ${textColor}`}>{price}</p>
      <p className="text-gray-700 text-center">{description}</p>
    </div>
    <div className="mt-4 text-center">
      <button className="bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors focus:ring ring-pink-400">
        اختر
      </button>
    </div>
  </div>
);

const Packages = () => (
  <section className="py-12 bg-gray-100">
    <div className="container mx-auto text-center">
      <h1 className="text-3xl font-bold mb-8 text-pink-600">
        تصفح جميع الباقات
      </h1>
      <div className="flex flex-wrap justify-center">
        {packages.map((pkg, index) => (
          <PackageCard
            key={index}
            name={pkg.name}
            price={pkg.price}
            description={pkg.description}
            borderColor={pkg.borderColor}
            textColor={pkg.textColor}
            bgColor={pkg.bgColor}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Packages;
