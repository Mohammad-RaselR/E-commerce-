import React, { useEffect, useState } from "react";

const CountdownBox = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSeconds =
          prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;

        if (totalSeconds <= 0) {
          clearInterval(countdown);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="px-40 py-10 bg-[#f8f3f3]">
      <div>
        <aside className="w-full md:w-[260px] border rounded-xl p-6 bg-white shadow-md text-center flex flex-col justify-between h-[370px]">
          <div>
                <p className="text-xl font-semibold mt-2">Only Available</p>
                <p className="text-xl font-semibold">For 24 Hours</p>

                <p className="text-xl font-bold text-red-600 mt-8">Don’t Miss Out!</p>
                <p className="text-lg font-semibold text-red-500 mt-5">Sale Ends in..</p>

                <div className="flex justify-center gap-4 mt-4">
                  {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((val, i) => (
                    <div
                      key={i}
                      className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                    >
                      {val.toString().padStart(2, "0")}
                    </div>
                  ))}
                </div>
          </div>        

          <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full text-sm">
            See All
          </button>
          </aside>
      </div>
    </div>

  );
};

export default CountdownBox;
