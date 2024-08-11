import Navbar from "../../components/navbar";

const View3 = () => {

  
  return (
    <div className="min-h-screen mx-7 bg-mainLightBg dark:bg-mainDarkBg">
      <Navbar />
      <div className="pt-28">
        <div className="text-center my-11 flex justify-center flex-col gap-7 items-center">
          <h1 className="text-xl lg:text-3xl text-textLightColor dark:text-textDarkColor font-semibold leading-relaxed">
            ISO Surface-Mount Technology <br /> (SMT) Standards
          </h1>
          <p className="text-md lg:text-xl text-textLightColor dark:text-textDarkColor font-medium w-3/5 leading-relaxed">
            ISO standards for SMT ensure quality and consistency in electronics
            manufacturing, covering design, assembly, and testing. They help
            reduce defects and enhance product performance, essential for
            meeting international quality benchmarks.
          </p>
        </div>
        <div className="mt-11 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
            {Array(8).fill(0).map((_, index) => (
              <div
                key={index}
                className="border dark:shadow-md dark:shadow-white text-textLightColor dark:text-textDarkColor p-4 rounded-xl shadow-xl bg-mainLightBg dark:bg-secDarkBg hover:bg-secLightBg dark:hover:bg-mainDarkBg duration-300 ease-in-out"
              >
                <div className="text-center mb-2">
                  <h2 className="text-lg font-semibold">Title {index + 1}</h2>
                </div>
                <div className="flex justify-center mb-2">
                  <img
                    src={`https://via.placeholder.com/100`}
                    alt="Placeholder"
                    className="rounded-full"
                  />
                </div>
                <p className="text-center">Subtitle for the item goes here.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View3;
