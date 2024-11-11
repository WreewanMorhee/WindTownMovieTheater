
import BasicSkeleton from "~/components/BasicSkeleton";


const ListSkeleton = () => {


  return (
    <div className="z-[4] bg-[--deep-blue]  left-[0px] right-[0px] fixed w-full">
    <div className=" w-full h-[calc(100svh-var(--header-height))] container mx-auto fone:overflow-scroll p-[--page-margin] pt-[--to-top]">
      <div className="mx-auto items-start content-start  bottom-[0px] left-[0px] grid grid-cols-1 fone:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-[--general-gap] ">
        <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
        <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
        <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
        <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
        <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
      </div>
    </div>
  </div>
  )
}

export default ListSkeleton;
