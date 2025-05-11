import { Mail, MapPin, Phone, Star } from "lucide-react";
import img1 from "../Images/ami.jpg";

const StoreDetails = () => {
  return (
    <div className="max-w-7xl mx-auto px-16 py-6 space-y-10">
      {/* === My Account Section === */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-6">Store Details</h2>
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Left: Profile Info */}
          <div className="w-full md:w-2/5 border rounded p-6 flex flex-col items-center">
            <img
              src={img1}
              alt="Profile"
              className="w-24 h-28 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">Md. Shahdat Hossain</h2>
            <div className="mt-8 space-y-3 text-sm w-full">
              {/* Email */}
              <div className="text-sm flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-700" />
                <a
                  href="mailto:mdshahdat@gmail.com"
                  className="hover:underline text-blue-600"
                >
                  mdshahdat@gmail.com
                </a>
              </div>

              {/* Rating */}
              <div className="text-sm flex items-center gap-2 text-gray-500 pl-1">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>No Ratings found yet!</span>
              </div>

              {/* Location */}
              <div className="text-sm flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-700" />
                <span>Dhaka, Bangladesh</span>
              </div>

              {/* Phone */}
              <div className="text-sm flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-700" />
                <span>01885374041</span>
              </div>
            </div>
          </div>

          {/* Right: Store Banner */}
          <div className="w-full md:w-3/5 border rounded-md overflow-hidden flex items-center justify-center">
            <img
              src="https://via.placeholder.com/600x300?text=Store+Banner"
              alt="Store Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* === Store Time, Contact, Product Section === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Store Time */}
          <div>
            <h2 className="text-xl font-bold mb-4">Store Time</h2>
            <ul className="space-y-1 text-sm">
              {[
                { day: "Monday", time: "8:30 am - 9:00 pm" },
                { day: "Tuesday", time: "8:30 am - 9:00 pm" },
                { day: "Wednesday", time: "8:30 am - 9:00 pm" },
                { day: "Thursday", time: "8:30 am - 9:00 pm" },
                { day: "Friday", time: "8:30 am - 9:00 pm" },
                { day: "Saturday", time: "8:30 am - 9:00 pm" },
                { day: "Sunday", time: "Off Day", isOff: true },
              ].map(({ day, time, isOff }) => (
                <li key={day} className="flex justify-between">
                  <span className="font-medium">{day}</span>
                  <span className={isOff ? "font-bold text-red-500" : ""}>{time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Vendor */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Vendor</h2>
            <form className="space-y-4 text-sm ">
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <textarea
                rows="3"
                placeholder="Type your message.........."
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded px-4 py-2 text-sm font-bold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Product Search & Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Product Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-2 w-full md:w-2/3">
              <input
                type="text"
                placeholder="Enter product name"
                className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded px-4 py-2 text-sm font-bold">
                Search
              </button>
            </div>
            <select className="border border-gray-300 rounded px-4 py-2 text-sm w-full md:w-auto">
              <option>Default sorting</option>
              <option>Price low to high</option>
              <option>Price high to low</option>
            </select>
          </div>

          {/* No Products Message */}
          <div className="bg-cyan-200 text-lg text-center px-4 py-3 rounded">
            No Products were found of this vendor!
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
