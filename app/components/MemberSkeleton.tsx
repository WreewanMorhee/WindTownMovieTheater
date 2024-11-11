
import BasicSkeleton from "~/components/BasicSkeleton";


const MemberSkeleton = () => {


  return (
    <div
    className={
      "fone:h-[calc(100svh-var(--header-height))]  member-content transition-[filter]  desk:h-[calc(100vh-75px)] flex bg-[--big] overflow-hidden fone:pt-[16px] desk:pt-[0px] fone:flex-col desk:flex-row "
    }
  >
    <div
      className={
        "bg-[--deep-blue] fone:z-[3] fone:fixed fone:top-[--header-height] justify-center text-white fone:p-[16px] desk:p-5 flex items-center overflow-hidden gap-[--general-gap] fone:flex-row-reverse desk:flex-col fone:w-full desk:w-1/4 fone:min-h-[98px] "
      }
    >
      <BasicSkeleton className="text-[#ffffff] bg-[--bg]  w-[80%] p-[--comp-little-padding] rounded-[--rounded]">
        <span className="opacity-0">
          loading <br className="desk-none" /> (loading)
        </span>
      </BasicSkeleton>

      <BasicSkeleton className="desk:mb-[20vh]  w-[80%] p-2 rounded-[--rounded]">
        <span className="opacity-0"> loading </span>
      </BasicSkeleton>
    </div>

    <div className="fone:hidden fone:w-[80%] desk:w-[1px] fone:min-h-[1px] desk:h-[50vh] bg-[--btn-bg] self-center"></div>

    <div
      className={
        "fone:h-[calc(100svh-var(--header-height))] fone:w-full desk:w-3/4  overflow-scroll "
      }
    >
      <div
        className={
          "px-[--comp-padding] fone:z-[3] fone:fixed fone:top-[220px] fone:flex desk:block pt-[--to-top] bg-[--deep-blue] w-full z-[2] sticky top-[0px] relative inline-block"
        }
      >
        <BasicSkeleton
          style={{
            textAlignLast: "center",
          }}
          className="cursor-pointer fone:mx-auto bg-[--deep-blue] text-white text-[18px]  text-center py-[--comp-little-padding] rounded-[--rounded] w-[320px] appearance-none focus:ring-0 focus:outline-none"
        >
          <span className="opacity-0"> loading </span>
        </BasicSkeleton>
      </div>

      <div className="fone:pt-[155px] mt-[24px] relative grid grid-cols-1 fone:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[--general-gap] pb-[10%] px-[--page-margin]">
        <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
        <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
        <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
        <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
      </div>
    </div>
  </div>
  )
}

export default MemberSkeleton;
