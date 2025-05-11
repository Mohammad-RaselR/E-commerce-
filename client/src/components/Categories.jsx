import React from 'react';
import FurnitureImg from '../Images/watch.png';
import ShoesImg from '../Images/watch.png';
import SmartphonesImg from '../Images/watch.png';
import AirPurifiersImg from '../Images/watch.png';
import ToysImg from '../Images/watch.png';
import HeadphonesImg from '../Images/watch.png';

const categories = [
  { name: 'Furniture', img: FurnitureImg, bg: 'bg-[#DEE5DC]', link: '/categories/furniture' },
  { name: 'Shoes', img: ShoesImg, bg: 'bg-[#FFE3DB]', link: '/categories/shoes' },
  { name: 'Smartphones', img: SmartphonesImg, bg: 'bg-[#DDEBFB]', link: '/categories/smartphones' },
  { name: 'Air Purifiers', img: AirPurifiersImg, bg: 'bg-[#DDF3E4]', link: '/categories/air-purifiers' },
  { name: 'Toys', img: ToysImg, bg: 'bg-[#FFEAD2]', link: '/categories/toys' },
  { name: 'Headphones', img: HeadphonesImg, bg: 'bg-[#D9E6EB]', link: '/categories/headphones' },
];

const Categories = () => {
  return (
    <div className="px-40 bg-[#f4f4f4] py-10 border-gray-200 border-2 p-2">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Explore More Categories</h2>
        
      </div>

      <div className="flex flex-wrap justify-start gap-20">
        {categories.map((category) => (
          <a
            key={category.name}
            href={category.link}
            className="flex flex-col items-center space-y-4 cursor-pointer hover:opacity-90"
          >
            <div className={`w-32 h-32 rounded-full flex items-center justify-center ${category.bg}`}>
              <img src={category.img} alt={category.name} className="w-20 h-20 object-contain" />
            </div>
            <span className="text-sm font-medium text-gray-800">{category.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Categories;
