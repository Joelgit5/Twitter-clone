const ProfileHeaderSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full my-2 p-4">
      <div className="flex gap-2 items-center">
        <div className="flex flex-1 gap-1">
          <div className="flex flex-col gap-1 w-full">
            {/* text-1 */}
            <div className="skeleton h-4 w-12 rounded-full"></div>
            {/* text-2 */}
            <div className="skeleton h-4 w-16 rounded-full mb-2"></div>

            {/* Cover Img */}
            <div className="skeleton h-40 w-full relative">
              {/* Profile Img */}
              <div className="skeleton h-20 w-20 rounded-full border absolute -bottom-10 left-3"></div>
            </div>

            {/* Follow Btn */}
            <div className="skeleton h-6 mt-4 w-24 ml-auto rounded-full"></div>

            {/* Text */}
            <div className="skeleton h-4 w-14 rounded-full mt-4"></div>
            <div className="skeleton h-4 w-20 rounded-full"></div>
            <div className="skeleton h-4 w-2/3 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileHeaderSkeleton;
