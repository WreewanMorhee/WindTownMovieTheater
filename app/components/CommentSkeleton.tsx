import BasicSkeleton from "./BasicSkeleton"

type CommentSkeletonType = {
  fetch_ref?: (node?: Element | null) => void | null
  count?: number
  className?: string
}

const comp_list = (fetch_ref: ((node?: Element | null) => void) | null, className?: string) => [
  <li
    key={1}
    ref={fetch_ref}
    className={"self-baseline flex flex-col shrink-0 px-[--comp-padding] py-[8px] pr-[32px] mt-[16px] border-[1px] border-[rgba(150,150,150,0.35)] rounded-[--rounded] " + className}
  >
    <div className="flex">
      <BasicSkeleton
        style={{
          animationDelay: '100ms',
        }}
        className="w-[30px] min-h-[30px] h-[30px] rounded-full "
      />

      <BasicSkeleton
        style={{
          animationDelay: '200ms',
        }}
        className="rounded-[--rounded] ml-[8px] h-[30px] text-[16px] text-[rgb(150,150,150)]"
      >
        Name Name Name
      </BasicSkeleton>

      <BasicSkeleton
        style={{
          animationDelay: '300ms',
        }}
        className="!rounded-[--rounded] ml-[8px] w-[30px] h-[30px] text-[16px] text-[rgb(150,150,150)]"
      >
        love
      </BasicSkeleton>
    </div>
    <div>
      <BasicSkeleton
        style={{
          animationDelay: '400ms',
        }}
        className="mt-[8px] rounded-[--rounded] ml-[38px]  text-[16px] text-[rgb(150,150,150)]"
      >
        content content content content
      </BasicSkeleton>
    </div>
  </li>,
  <li
    key={2}
    className="self-baseline flex flex-col shrink-0 px-[--comp-padding] py-[8px] pr-[32px] mt-[16px] border-[1px] border-[rgba(150,150,150,0.35)] rounded-[--rounded]"
  >
    <div className="flex">
      <BasicSkeleton
        style={{
          animationDelay: '100ms',
        }}
        className="w-[30px] min-h-[30px] h-[30px] rounded-full "
      />

      <BasicSkeleton
        style={{
          animationDelay: '200ms',
        }}
        className="rounded-[--rounded] ml-[8px]  h-[30px] text-[16px] text-[rgb(150,150,150)]"
      >
        Name
      </BasicSkeleton>

      <BasicSkeleton
        style={{
          animationDelay: '300ms',
        }}
        className="!rounded-[--rounded] ml-[8px] w-[30px] h-[30px] text-[16px] text-[rgb(150,150,150)]"
      >
        love
      </BasicSkeleton>
    </div>
    <div>
      <BasicSkeleton
        style={{
          animationDelay: '400ms',
        }}
        className="mt-[8px] rounded-[--rounded] ml-[38px]  text-[16px] text-[rgb(150,150,150)]"
      >
        content content content content content content content content content
        content
      </BasicSkeleton>
    </div>
  </li>,
  <li
    key={3}
    className="self-baseline flex flex-col shrink-0 px-[--comp-padding] py-[8px] pr-[32px] mt-[16px] border-[1px] border-[rgba(150,150,150,0.35)] rounded-[--rounded]"
  >
    <div className="flex">
      <BasicSkeleton
        style={{
          animationDelay: '100ms',
        }}
        className="w-[30px] min-h-[30px] h-[30px] rounded-full "
      />

      <BasicSkeleton
        style={{
          animationDelay: '200ms',
        }}
        className="rounded-[--rounded] ml-[8px] h-[30px] text-[16px] text-[rgb(150,150,150)]"
      >
        Name Name
      </BasicSkeleton>

      <BasicSkeleton
        style={{
          animationDelay: '300ms',
        }}
        className="!rounded-[--rounded] ml-[8px] w-[30px] h-[30px] text-[16px] text-[rgb(150,150,150)]"
      >
        love
      </BasicSkeleton>
    </div>
    <div>
      <BasicSkeleton
        style={{
          animationDelay: '400ms',
        }}
        className="mt-[8px] rounded-[--rounded] ml-[38px]  text-[16px] text-[rgb(150,150,150)]"
      >
        content content content content content content content content
      </BasicSkeleton>
    </div>
  </li>,
]

const CommentSkeleton: React.FC<CommentSkeletonType> = ({
  count = 3,
  fetch_ref = null,
  className = ''
}): React.ReactNode => <>{comp_list(fetch_ref, className).slice(0, count)}</>

export default CommentSkeleton
