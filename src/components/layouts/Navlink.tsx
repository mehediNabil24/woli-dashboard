import {   CiSettings} from 'react-icons/ci';

import { FaShop,} from 'react-icons/fa6';


import { GoPlus} from 'react-icons/go';


import { LuCalendarDays } from 'react-icons/lu';

import { RiDashboardFill } from 'react-icons/ri';



export const navLink = [
 

  {
    name: "Report",
    href: "/dashboard",
    icon: LuCalendarDays,
  },
  {
    name: "Scoreboard",
    href: "/dashboard/scoreboard",
    icon: LuCalendarDays,
  },
  {
    name: "Add Deal",
    href: "/dashboard/addDeal",
    icon: LuCalendarDays,
  },
  {
    name: "Pending Deal",
    href: "/dashboard/pendingDeal",
    icon: LuCalendarDays,
  },

  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: CiSettings,
  }
 
];


export const AdminNavLink = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: RiDashboardFill,
  },
    {
    name: "Individual P&L",
    href: "/admin/individual",
    icon: LuCalendarDays,
  },
    {
    name: "Agent List",
    href: "/admin/agent",
    icon: LuCalendarDays,
  },
  
  {
    name: "Deals",
    href: "#",
    icon: FaShop,
    subItems: [

      {
        name: "Add Deal",
        href: "/admin/add-deal",
        icon: GoPlus,

      },
      {
        
          name: "Deal List",
          href: "/admin/deal-list",
          icon: FaShop,
      },
      {
        name: "Deal Request",
        href: "/admin/deal-request",
        icon: FaShop,
      },
      
   

    ]
  },
    {
    name: "Report",
    href: "/admin/report",
    icon: LuCalendarDays,
  },
    {
    name: "Scoreboard",
    href: "/admin/scoreboard",
    icon: LuCalendarDays,
  },
    {
    name: "Level",
    href: "/admin/level",
    icon: LuCalendarDays,
  },
    {
    name: "Closers P&L",
    href: "/admin/closers",
    icon: LuCalendarDays,
  },
  // {
  //   name: "Locations",
  //   href: "#",
  //   icon: CiLocationOn,
  //   subItems: [
  //     {
  //       name: "Add Location",
  //       href: "/admin/add-location",
  //       icon: MdOutlineAddLocationAlt,
  //     },
  //     {
  //       name: "All Location",
  //       href: "/admin/all-location",
  //       icon: GrMapLocation,
  //     },
  //   ],
  // },
 
  // {
  //   name:"Shop Payment",
  //   href: "/admin/shop-payment",
  //   icon: MdOutlinePayments
  // },
  {
    name:"Profile",
    href: "/admin/admin-profile",
    icon: CiSettings
  },


  
];
