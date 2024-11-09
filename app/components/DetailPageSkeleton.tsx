import BasicSkeleton from "./BasicSkeleton";



const DetailPageSkeleton = () => {

  return (
    <div
      className="overflow-hidden z-[3] fixed left-[0px] bottom-[0px] w-[100vw] h-[calc(100svh-var(--header-height))] bg-[--deep-blue]"
    >



      <div className=" relative container mx-auto fone:overflow-scroll fone:px-[--page-margin] desk:px-[0px] fone:block desk:grid grid-cols-1 md:grid-cols-3 gap-24 h-full ">
        {/* Movie Poster */}
        <BasicSkeleton className="rounded-[--rounded] flex items-start justify-end col-span-1 mt-[--to-top] fone:mx-auto desk:mx-unset w-[300px] h-[450px]" />

        {/* Movie Details */}
        <div className="scrollbar-hide col-span-2 fone:h-auto desk:h-full fone:overflow-hidden desk:overflow-scroll pb-[32px] pt-[--to-top]">
          <BasicSkeleton className="rounded-[--rounded] w-[70%] h-[48px]" />

          <div className="flex mt-[16px]">
            <BasicSkeleton
              className="rounded-full w-[50px] h-[50px] relative ml-[0px] mr-[16px]"
            />

            <BasicSkeleton className={'rounded-full w-[50px] h-[50px] '} />
          </div>

          <div className="text-gray-300 mt-[24px] text-[24px]">
            <BasicSkeleton className='rounded-[--rounded] w-[40%] h-[32px]' />
          </div>
          <div className="text-gray-300 mt-[24px] text-[24px] flex items-center w-full flex-row">
            
          <BasicSkeleton className='rounded-[--rounded] w-[20%] h-[32px]' />
          </div>
          <div className="text-gray-300 mt-[24px] text-[24px]">
           
          <BasicSkeleton className='rounded-[--rounded] w-[20%] h-[32px]' />
          </div>
          <div className="text-gray-300 mt-[24px] text-[24px]">
          
          <BasicSkeleton className='rounded-[--rounded] w-[35%] h-[32px]' />
          </div>
          <div className="text-gray-300 mt-[24px] text-[24px]">
           
          <BasicSkeleton className='rounded-[--rounded] w-[24%] h-[32px]' />
          </div>
          <div className="text-gray-300 mt-[24px] text-[24px]">
            
          <BasicSkeleton className='rounded-[--rounded] w-[20%] h-[32px]' />
          </div>

          {/* Cast */}
          {/* <h2 className="text-[32px] font-bold text-white mt-[40px]">卡司群</h2>
          <div className="flex overflow-x-scroll gap-[--general-gap] mt-[16px] scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-900">
            {cast.map((actor: CastMember) => (
              <div
                key={actor.id}
                className={
                  " flex flex-col items-center flex-none w-[104px] min-w-[104px]"
                }
              >
                <LazyImage
                  className="rounded-full w-full h-[156px] object-cover shadow-md"
                  src={
                    !!actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "/assets/avatar.webp"
                  }
                  index={`cast-${actor.id}`}
                  alt={actor.name}
                  width="104"
                  height="156"
                />
                <div className="text-center text-gray-200 mt-4">{actor.name}</div>
                <div className="text-center text-sm text-gray-300">
                  {actor.character}
                </div>
              </div>
            ))}
          </div> */}



        </div>
      </div>
    </div>
  );
};

export default DetailPageSkeleton;
