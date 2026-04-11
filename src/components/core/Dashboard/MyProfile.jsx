import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Img from "../../common/Img"
import IconBtn from "../../common/IconBtn"
import { RiEditBoxLine } from "react-icons/ri"
import formattedDate from "../../../../service/fromatDate.js"

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Common class for the "Gold" Edit button to match the image
  const btnStyle = "bg-[#D4AF37] hover:bg-[#b89638] text-5D171F px-4 py-2 rounded-lg transition-all duration-200"

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10 ">
      {/* Title with Serif feel from image */}
      <h1 className="mb-14 text-4xl font-bold text-black font-serif text-center sm:text-left">
        My Profile
      </h1>

      {/* Section 1: Top Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items- justify-between rounded-2xl border border-[#E8E8E8] bg-[#FFF9F3] p-8 px-3 sm:px-12 shadow-sm gap-y-6">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-x-6">
          <Img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[100px] rounded-full  object-cover border-2 border-white shadow-sm"
          />
          <div className="space-y-1 flex items-center sm:items-start flex-col">
            <p className="text-xl font-bold text-black capitalize">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-gray-500 font-medium">
              {user?.email}
            </p>
          </div>
        </div>

        <IconBtn
          text="Edit"
          onClick={() => { navigate("/dashboard/settings") }}
          customClasses={btnStyle}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* Section 2: Personal Details */}
      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border border-[#E8E8E8] bg-[#FFF9F3] p-8 px-7 sm:px-12 shadow-sm">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-bold text-black">Personal Details</p>
          <IconBtn
            text="Edit"
            onClick={() => { navigate("/dashboard/settings") }}
            customClasses={btnStyle}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex flex-col sm:flex-row max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-1 text-lg text-black font-semibold">First Name</p>
              <p className="text-sm font-bold text-[#5D5D5D] capitalize">{user?.firstName}</p>
            </div>

            <div>
              <p className="mb-1 text-lg text-black font-semibold">Account Type</p>
              <p className="text-sm font-bold text-[#5D5D5D] capitalize">{user?.accountType}</p>
            </div>

            <div>
              <p className="mb-1 text-lg text-black font-semibold">Gender</p>
              <p className="text-sm font-bold text-[#5D5D5D] capitalize">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-1 text-lg text-black font-semibold">Last Name</p>
              <p className="text-sm font-bold text-[#5D5D5D] capitalize">{user?.lastName}</p>
            </div>

            <div>
              <p className="mb-1 text-lg text-black font-semibold">Email</p>
              <p className="text-sm font-bold text-[#5D5D5D]">{user?.email}</p>
            </div>

            <div>
              <p className="mb-1 text-lg text-black font-semibold">Date Of Birth</p>
              <p className="text-sm font-bold text-[#5D5D5D]">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile