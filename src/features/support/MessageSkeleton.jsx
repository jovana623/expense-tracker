/* eslint-disable react/prop-types */
function MessageBubbleSkeletonItem({ isSender, widthClass }) {
  return (
    <div
      className={`flex items-end gap-2 animate-pulse ${
        isSender ? "self-end justify-end" : "self-start"
      }`}
    >
      {!isSender && (
        <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full flex-shrink-0"></div>
      )}

      <div
        className={`h-10 bg-gray-200 dark:bg-gray-600 rounded-lg ${widthClass}`}
      ></div>
    </div>
  );
}

function MessageSkeleton() {
  const widths = ["w-1/3", "w-1/2", "w-2/3", "w-3/4", "w-2/5", "w-3/5"];

  const skeletonMessages = [
    { isSender: false, width: widths[2] },
    { isSender: true, width: widths[1] },
    { isSender: false, width: widths[3] },
    { isSender: true, width: widths[0] },
    { isSender: false, width: widths[4] },
    { isSender: true, width: widths[5] },
    { isSender: false, width: widths[1] },
    { isSender: true, width: widths[2] },
  ];

  return (
    <>
      {skeletonMessages.map((msg, index) => (
        <MessageBubbleSkeletonItem
          key={index}
          isSender={msg.isSender}
          widthClass={msg.width}
        />
      ))}
    </>
  );
}

export default MessageSkeleton;
