function LimitsCard() {
  return (
    <div className="flex bg-white">
      <div className="">
        <div className="p-3 shadow rounded">
          <div className="w-80 h-auto bg-gray-100 p-3 rounded-full">
            <div className="inline-block w-[70%] h-auto bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full p-2"></div>
            <div className="inline-block font-bold text-yellow-600">50%</div>
          </div>
          <div className="text-lg text-center text-gray-700 font-bold">
            Your order is being prepared!
          </div>
        </div>
      </div>
    </div>
  );
}

export default LimitsCard;
