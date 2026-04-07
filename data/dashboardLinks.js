import { ACCOUNT_TYPE } from "../src/redux/constant";

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount", // Kept from your original set
  },
  {
    id: 2,
    name: "Saved Heritage",
    path: "/dashboard/saved-heritage",
    type: ACCOUNT_TYPE.USER, // Wrapped in UserRoutes
    icon: "VscArchive",
  },
  {
    id: 3,
    name: "Add Heritage",
    path: "/dashboard/add-heritage",
    type: ACCOUNT_TYPE.ADMIN, // Wrapped in AdminRoutes
    icon: "VscAdd",
  },
  {
    id: 4,
    name: "All Heritage",
    path: "/dashboard/all-heritage",
    type: ACCOUNT_TYPE.ADMIN, // Wrapped in AdminRoutes
    icon: "VscLibrary",
  },
];

export const navbarLinks = [
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: "VscHome", // Changed from Account to Home
  },
  {
    id: 2,
    name: "Heritage Map",
    path: "/heritage-map",
    type: ACCOUNT_TYPE.USER,
    icon: "VscLocation", // Represents mapping/coordinates better than Archive
  },
  {
    id: 3,
    name: "About Us",
    path: "/about",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscInfo", // Changed from Add to Info for "About Us"
  },
];