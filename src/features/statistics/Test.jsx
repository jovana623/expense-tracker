import { useSearchParams } from "react-router-dom";
import { formatMonthYear } from "../../helpers/dateFunctions";

/* eslint-disable react/prop-types */
function Test() {
  return (
    <section class="bg-gray-900 h-screen flex justify-center items-center gap-x-16 text-white">
      <div class="w-[300px] h-[420px] bg-transparent cursor-pointer group perspective">
        <div class="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
          <div class="absolute backface-hidden border-2 w-full h-full">
            <img src="./assets/kingsman.jpg" class="w-full h-full" />
          </div>
          <div class="absolute my-rotate-y-180 backface-hidden w-full h-full bg-gray-100 overflow-hidden">
            <div class="text-center flex flex-col items-center justify-center h-full text-gray-800 px-2 pb-24">
              <h1 class="text-3xl font-semibold">The King's Man</h1>
              <p class="my-2">9.0 Rating</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                itaque assumenda saepe animi maxime libero non quasi, odit natus
                veritatis enim culpa nam inventore doloribus quidem temporibus
                amet velit accusamus.
              </p>
              <button class="bg-teal-500 px-6 py-2 font-semibold text-white rounded-full absolute -bottom-20 delay-500 duration-1000 group-hover:bottom-20 scale-0 group-hover:scale-125">
                Watch Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Test;
