const TailwindIndicator: React.FC = () => {
  if (import.meta.env.PROD) return null;
  return (
    <div className="fixed bottom-5 left-10 z-50 flex size-8 items-center justify-center rounded-full bg-neutral-900 p-3 font-sans text-xs text-white">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
};

export default TailwindIndicator;
