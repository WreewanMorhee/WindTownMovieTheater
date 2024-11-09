import { isRouteErrorResponse, Link, useRouteError } from "@remix-run/react";
import { useEffect } from "react";
import { post_error } from "~/api/post-error";

const GeneralErrorBoundary = () => {
    const error = useRouteError();

    useEffect(() => {
      post_error({error, location: window.location.href})
    }, [])
  
    if (isRouteErrorResponse(error) && error?.status === 404) {
      return (
        <div className="flex-col flex w-full h-[70vh] items-center justify-center text-[24px] text-white">
          <div className="w-[320px] min-h-[320px] h-[320px] bg-cetner bg-no-repeat bg-contain bg-[url(/assets/empty.webp)]" />
          <h1>404 - Not Found</h1>
          <p>網址是不是錯誤的啊...</p>

          <a href="/"  className=' mt-[16px] text-white py-[--comp-little-padding] px-[--comp-padding] rounded-[--rounded]  bg-[--btn-bg] border border-[transparent] '>點我回首頁</a>
        </div>
      );
    }
  
    return (
      <div className="px-[--page-margin] flex-col flex w-full h-[50vh] items-center justify-center text-[24px] text-white">
        <h1>有錯誤發生誒...聯絡一下客服好了：</h1>
        <a className="text-[--red]" href="mailto:abc@gmail.com">
          abc@gmail.com
        </a>
        <p>
          {error instanceof Error ? error.message : "Unknown error occurred."}
        </p>

        <a href="/" className=' mt-[16px] text-white py-[--comp-little-padding] px-[--comp-padding]  rounded-[--rounded]  bg-[--btn-bg] border border-[transparent] '>點我回首頁</a>
      </div>
    );
  }

  export default GeneralErrorBoundary