


export default function OffLine() {
  return (
    <>
      <section className="w-full  bg-white ">
        <div className="container w-full px-3  h-[100vh] flex flex-col gap-4 justify-center items-center">
          <div className="inear  m-auto boder  dark:shadow-gray-400 text-center shadow-md space-y-4 p-8 rounded-lg shadow-primay-100 border border-primay-200  ">
            <i className="fa-solid fa-wifi text-3xl  text-red-600"></i>

            <h2 className="text-xl  font-semibold text-gray-600 ">
              You are offline, please check your internet connection.
            </h2>
            <p className="text-4xl font-bold d text-black">
              {" "}
              <span>
               
              </span>{" "}
              <div className="flex justify-center">
               <img src="../../src/assets/images/logo.png" alt="GroVana Logo" className="w-50 h-50" />
                  </div>

            </p>
          </div>
        </div>
      </section>
    </>
  );
}



