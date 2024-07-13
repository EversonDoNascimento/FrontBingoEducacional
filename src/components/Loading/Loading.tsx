const Loading = () => {
  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-black/50">
      <div className="animate-spin w-16 h-16 border-l-8 border-t-8 border-dotted rounded-full "></div>
    </div>
  );
};

export default Loading;
