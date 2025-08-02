
import { DollarCircleFilled } from '@ant-design/icons';
import { File } from 'lucide-react';
import {   CiSettings} from 'react-icons/ci';

import {  FaHandHolding, FaHandshake,  FaRankingStar,  FaUser, FaUsers, FaUsersLine,} from 'react-icons/fa6';
import { FiUserPlus } from "react-icons/fi";
import { TbReportSearch } from "react-icons/tb";


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
    href: "#",
    icon: MdLeaderboard,
    subItems: [

      {
        name: "Agent Scoreboard",
        href: "/dashboard/agent/scoreboard",
        icon: MdLeaderboard,

      },
      {
    name: "Team Scoreboard",
    href: "/dashboard/agent/team-scoreboard",
    icon: MdLeaderboard,
      },
]
},
  {
    name: "My Teams",
    href: "/dashboard/agent/myTeams",
    icon: FiUserPlus,
  },
  {
    name: "Teams Report",
    href: "/dashboard/agent/teamReport",
    icon: TbReportSearch,
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
    href: "/dashboard/admin",
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
    name: "Products",
    href: "#",
    icon: FaHandshake,
    subItems: [

      {
        name: "Add Products",
        href: "/dashboard/admin/add-deal",
        icon: GoPlus,

      },
      {
        name:" All Company",
        href: "/dashboard/admin/company-list",
        icon: FaUsers,

      },
      {
        
          name: "Product List",
          href: "/dashboard/admin/deal-list",
          icon: FaUsers,
      },
      {
        name: "Deal Request",
        href: "/dashboard/admin/deal-request",
        icon: FaUsersLine,
      },
      
   

    ]
  },
    {
    name: "Report",
    href: "/dashboard/admin/report",
    icon: File,
  },
   {
     name: "Scoreboard",
    href: "#",
    icon: MdLeaderboard,
    subItems: [

      {
        name: "Agent Scoreboard",
        href: "/dashboard/admin/scoreboard",
        icon: MdLeaderboard,

      },
      {
    name: "Team Scoreboard",
    href: "/dashboard/admin/team-scoreboard",
    icon: MdLeaderboard,
      },
]
},
  {
     name: "Level",
    href: "#",
    icon: FaRankingStar,
    subItems: [

      {
        name: "Add Level",
        href: "/dashboard/admin/add-level",
        icon: GoPlus,

      },
      {
    name: "Level",
    href: "/dashboard/admin/level",
    icon: FaRankingStar,
  },
]
},

  
    
    {
    name: "Closers P&L",
    href: "/dashboard/admin/closers",
    icon: DollarCircleFilled,
  },
    {
    name: "Sales",
    href: "/dashboard/admin/sales",
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
    href: "/dashboard/admin/admin-profile",
    icon: CiSettings
  },


  
];
