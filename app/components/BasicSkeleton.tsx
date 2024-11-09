

type BasicSkeletonType = {
  className: string
  children?: React.ReactElement | string
  style?: {}
}


const BasicSkeleton: React.FC<BasicSkeletonType> = ({
  className = '',
  children,
  style,
}) => (
  <div
    style={{
      ...style,
    }}
    className={
      'select-none opacity-[0.1] animate-[skeleton_0.8s_ease-in_alternate_infinite] bg-[rgb(150,150,150)] ' +
      className
    }
  >
    {children}
  </div>
)

export default BasicSkeleton
export const skeleton_css = 'select-none opacity-[0.1] animate-[skeleton_0.8s_ease-in_alternate_infinite] bg-[rgb(150,150,150)]'
