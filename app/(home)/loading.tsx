export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex justify-center items-center w-full h-full space-x-3">
      <div className="w-5 h-5 bg-primary rounded-full animate-bounce"></div>
      <div className="w-5 h-5 bg-primary rounded-full animate-bounce200"></div>
      <div className="w-5 h-5 bg-primary rounded-full animate-bounce400"></div>
    </div>
  );
}
