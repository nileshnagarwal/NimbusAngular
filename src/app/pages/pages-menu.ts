import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Enquiries-Quotes',
    icon: 'layout-outline',
    children: [
      {
        title: 'Enquiries',
        link: '/pages/enquiries-quotes/enquiries',
      },
      {
        title: 'Enquiries Search',
        link: '/pages/enquiries-quotes/enquiries-search',
      },
      {
        title: 'Quotes Report',
        link: '/pages/enquiries-quotes/quotes-report',
      },
    ],
  },
  {
    title: 'Masters',
    icon: 'grid-outline',
    children: [
      {
        title: 'Vehicle Body',
        link: '/pages/masters/vehicle-body',
      },
      {
        title: 'Vehicle Type',
        link: '/pages/masters/vehicle-type',
      },
      {
        title: 'Transporter',
        link: '/pages/masters/transporter',
      },
    ],
  },
];
