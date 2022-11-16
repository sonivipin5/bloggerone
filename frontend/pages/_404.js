
import Div from "@/components/Div";
import Link from "next/link";
import React from "react";

export default function PageNotFound() {
  const css = {
    main: "flex justify-center items-center w-full h-[70vh]  font-bold ",
    foo: "space-x-5 text-3xl z-[0] text-white ",
    cover: "absolute top-0 left-0 w-full h-full z-[-1] bg-gray-900",
    gotohome: "text-md text-center my-5 text-blue-800 z-[2] underline",
  };
  return (
    <Div>
      <div className={css.main}>
        <div>
            
          <div className={css.foo}>
            <span>404</span>
            <span>Page Not Found</span>
          </div>

          <span className={css.cover}></span>

          <div className={css.gotohome}>
            <Link href={"/"}>
              <a>Go To Home</a>
            </Link>
          </div>

        </div>
      </div>
    </Div>
  );
}
