const App = () => {
  return (
    <>
      <div className="wrap container mx-auto bg-indigo-500 columns-3 gap-8">
        <img
          className="w-full aspect-square"
          src="https://placehold.co/600x400"
        />
        <img
          className="w-full aspect-square"
          src="https://placehold.co/600x400"
        />
        <img
          className="w-full aspect-square"
          src="https://placehold.co/600x400"
        />
      </div>
      <div className="container mx-auto bg-red-400">
        <span className="inline-grid grid-cols-3 gap-4">
          <span>01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
          <span>05</span>
          <span>06</span>
        </span>
        <span className="inline-grid grid-cols-3 gap-4">
          <span>01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
          <span>05</span>
          <span>06</span>
        </span>
      </div>
    </>
  );
};

export default App;
