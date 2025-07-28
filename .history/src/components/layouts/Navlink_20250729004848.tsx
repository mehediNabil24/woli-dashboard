
import { DollarCircleFilled } from '@ant-design/icons';
import { File } from 'lucide-react';
import {   CiSettings} from 'react-icons/ci';

import {  FaHandHolding, FaHandshake,  FaRankingStar,  FaUser, FaUsers, FaUsersLine,} from 'react-icons/fa6';


import { GoPlus} from 'react-icons/go';



import { MdLeaderboard, MdPending, MdReport } from 'react-icons/md';

import { RiDashboardFill } from 'react-icons/ri';




export const navLink = [
 

  {
    name: "Report",
    href: "/dashboard/agent",
    icon: MdReport,
  },
  {
    name: "Scoreboard",
    href: "/dashboard/agent/scoreboard",
    icon: MdLeaderboard,
  },
  {
    name: "Add Deal",
    href: "/dashboard/agent/addDeal",
    icon: GoPlus,
  },
  {
    name: "Pending Deal",
    href: "/dashboard/agent/pendingDeal",
    icon: MdPending,
  },

  {
    name: "Profile",
    href: "/dashboard/agent/profile",
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
    href: "/dashboard/admin/individual",
    icon: FaHandHolding,
  },
    {
    name: "Agent List",
    href: "/dashboard/admin/agent",
    icon: FaUser,
  },
  
  {
    name: "Deals",
    href: "#",
    icon: FaHandshake,
    subItems: [

      {
        name: "Add Deal",
        href: "//admin/add-deal",
        icon: GoPlus,

      },
      {
        
          name: "Deal List",
          href: "/admin/deal-list",
          icon: FaUsers,
      },
      {
        name: "Deal Request",
        href: "/admin/deal-request",
        icon: FaUsersLine,
      },
      
   

    ]
  },
    {
    name: "Report",
    href: "/admin/report",
    icon: File,
  },
    {
    name: "Scoreboard",
    href: "/admin/scoreboard",
    icon: MdLeaderboard,
  },
    {
    name: "Level",
    href: "/admin/level",
    icon: FaRankingStar,
  },
    {
    name: "Closers P&L",
    href: "/admin/closers",
    icon: DollarCircleFilled,
  },
    {
    name: "Sales",
    href: "/admin/sales",
    icon: DollarCircleFilled,
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
