import Navbar from "../components/navbar";

// Sample data, you can also import it from a JSON file
const data = [
  {
    link: "https://www.iso.org/standard/12345.html",
    author: "ISO/IEC JTC 1",
    date: "2024-05-15"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/67890.html",
    author: "ISO Technical Committee 1",
    date: "2023-11-22"
  },
  {
    link: "https://www.iso.org/standard/11223.html",
    author: "ISO Standards Board",
    date: "2024-01-10"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/44556.html",
    author: "ISO Working Group 2",
    date: "2024-07-05"
  },
  {
    link: "https://www.iso.org/standard/78901.html",
    author: "ISO Secretariat",
    date: "2024-03-30"
  }
];

const View5 = () => {
  return (
    <div className="min-h-screen mx-7 bg-mainLightBg dark:bg-mainDarkBg">
      <Navbar />
      <div className="pt-28">
        <div className="text-center my-11 flex justify-center flex-col gap-7 items-center">
          <h1 className="text-3xl text-textLightColor dark:text-textDarkColor font-semibold leading-relaxed">
            ISO Surface-Mount Technology <br /> (SMT) Standards
          </h1>
          <p className="text-xl text-textLightColor dark:text-textDarkColor font-medium w-3/5 leading-relaxed">
            ISO standards for SMT ensure quality and consistency in electronics
            manufacturing, covering design, assembly, and testing. They help
            reduce defects and enhance product performance, essential for
            meeting international quality benchmarks.
          </p>
        </div>
        <div className="flex justify-center items-center flex-col gap-7 w-full ">
          <div className="w-full  lg:w-3/4 bg-white dark:bg-secDarkBg rounded-xl shadow-lg dark:shadow-md p-4">
            <div className="grid grid-cols-3 gap-4 text-textLightColor dark:text-textDarkColor">
              <div className="font-semibold text-start p-2">Link</div>
              <div className="font-semibold text-center p-2">Author</div>
              <div className="font-semibold text-end p-2">Date</div>
            </div>
            <div  className="h-96 overflow-y-scroll">

            {data.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 gap-4 p-3 rounded-md ${index % 2 === 0 ? 'bg-mainLightBg dark:bg-mainDarkBg' : 'bg-secLightBg dark:bg-secDarkBg'} transition duration-300 ease-in-out`}
              >
                <a href={item.link} className="text-blue-500 dark:text-blue-400 hover:underline">
                  {item.link}
                </a>
                <p className="text-center text-textLightColor dark:text-textDarkColor ">{item.author}</p>
                <p className="text-end text-textLightColor dark:text-textDarkColor ">{item.date}</p>
              </div>
            ))}
          </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default View5;
