import Image from "next/image";

const Loader = () => {
  return (
    <div className="absolute top-0 z-[2] left-0 w-full h-[100vh] flex justify-center items-center ">
      <div className="fixed top-0 left-0 w-full bg-white h-screen opacity-50 z-[-1] "></div>
      <p className="text-2xl font-bold mx-3 mb-3"> Please Wait Data is Loading...</p>
      <Image src={"/Curve-Loading.gif.gif "} width={70} height={70} />
    </div>
  );
};

export default Loader;
