function MenuSkeleton() {
  return (
    <div className="lg:flex flex-col row-span-2 border-r border-stone-200 px-10 gap-15 h-full">
      <ul className="flex flex-col gap-4 text-stone-500 text-lg flex-1 mt-14">
        <div className="flex flex-col gap-8">
          <div className="h-4 bg-gray-200 rounded-full w-40"></div>
          <div className="h-4 bg-gray-200 rounded-full w-40"></div>
          <div className="h-4 bg-gray-200 rounded-full w-40"></div>
          <div className="h-4 bg-gray-200 rounded-full w-40"></div>
          <div className="h-4 bg-gray-200 rounded-full w-40"></div>
          <div className="h-4 bg-gray-200 rounded-full w-40"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded-full w-40 mt-auto"></div>
      </ul>
    </div>
  );
}

export default MenuSkeleton;
