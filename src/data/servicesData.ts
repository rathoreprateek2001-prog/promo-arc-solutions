// Asset imports for the 8 services
import promoImg from '../assets/services/promotional product support.jpg';
import promoSvg from '../assets/services/promotional product support.svg';

import orderImg from '../assets/services/order management.jpg';
import orderSvg from '../assets/services/order management.svg';

import clientImg from '../assets/services/client support.jpg';
import clientSvg from '../assets/services/client support.svg';

import graphicImg from '../assets/services/Graphic Design.jpg';
import graphicSvg from '../assets/services/Graphic Design.svg';

import vectorImg from '../assets/services/vector design and artwork.jpg';
import vectorSvg from '../assets/services/Vector Design & Artwork.svg';

import webstoreImg from '../assets/services/webstore operations.jpg';
import webstoreSvg from '../assets/services/Webstore Operations.svg';

import reportingImg from '../assets/services/reporting and operations (2).jpg';
import reportingSvg from '../assets/services/Reporting & Operations.svg';

import socialImg from '../assets/services/social media support.jpg';
import socialSvg from '../assets/services/Social Media Support.svg';

export interface ServiceDetail {
  id: number;
  num: string;
  title: string;
  shortTitle: string;
  desc: string;
  deliverables: string[];
  iconSvg: string;
  bgImage: string;
  category: 'Operations' | 'Creative';
}

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: 1,
    num: '01',
    title: 'Promotional Product Support',
    shortTitle: 'Product Support',
    desc: 'Product research, sourcing, comparison, and presentation based on client requirements, specifications, budget, and brand fit.',
    deliverables: [
      'Custom Product Presentations',
      'Supplier Quote Comparison',
      'Sample Requests & Virtuals'
    ],
    iconSvg: promoSvg,
    bgImage: promoImg,
    category: 'Operations'
  },
  {
    id: 2,
    num: '02',
    title: 'Order Management',
    shortTitle: 'Order Operations',
    desc: 'End-to-end order support with a focus on accurate data, timely processing, SLA compliance, and smooth workflow coordination.',
    deliverables: [
      'PO Generation & Entry',
      'Order Tracking & Proof Approvals',
      'Shipping & Delivery Verification'
    ],
    iconSvg: orderSvg,
    bgImage: orderImg,
    category: 'Operations'
  },
  {
    id: 3,
    num: '03',
    title: 'Client Support',
    shortTitle: 'Client Relations',
    desc: 'Professional communication, request handling, issue resolution, and coordination between clients, suppliers, and internal teams.',
    deliverables: [
      'Inquiry Triage & Response',
      'Supplier Dispute Resolution',
      'Cross-Team Coordination'
    ],
    iconSvg: clientSvg,
    bgImage: clientImg,
    category: 'Operations'
  },
  {
    id: 4,
    num: '04',
    title: 'Graphic Design',
    shortTitle: 'Graphic Design',
    desc: 'Professional graphics and creative assets for promotional products, marketing materials, social media, presentations, and digital platforms.',
    deliverables: [
      'Product Flyers & Catalogs',
      'Presentation Decks',
      'Digital Marketing Assets'
    ],
    iconSvg: graphicSvg,
    bgImage: graphicImg,
    category: 'Creative'
  },
  {
    id: 5,
    num: '05',
    title: 'Vector Design & Artwork',
    shortTitle: 'Vector Artwork',
    desc: 'Clean vector artwork, logo preparation, artwork cleanup, and production-ready files for promotional and print applications.',
    deliverables: [
      'Raster-to-Vector Redraws',
      'Color Separations & PMS Matching',
      'Production-Ready EPS/AI/PDFs'
    ],
    iconSvg: vectorSvg,
    bgImage: vectorImg,
    category: 'Creative'
  },
  {
    id: 6,
    num: '06',
    title: 'Webstore Operations',
    shortTitle: 'Webstore Ops',
    desc: 'Backend support for webstores, including product information, data management, content updates, and day-to-day operational tasks.',
    deliverables: [
      'OpenCart & Shopify Catalog Management',
      'Variant & SKU Configuration',
      'Inventory & Price Updates'
    ],
    iconSvg: webstoreSvg,
    bgImage: webstoreImg,
    category: 'Operations'
  },
  {
    id: 7,
    num: '07',
    title: 'Reporting & Operations',
    shortTitle: 'KPI & Reporting',
    desc: 'KPI dashboards, data checking, operational reporting, workflow coordination, and process support.',
    deliverables: [
      'Weekly/Monthly KPI Summaries',
      'Order Accuracy Auditing',
      'Process Bottleneck Analysis'
    ],
    iconSvg: reportingSvg,
    bgImage: reportingImg,
    category: 'Operations'
  },
  {
    id: 8,
    num: '08',
    title: 'Social Media Support',
    shortTitle: 'Social Media',
    desc: 'Content and operational assistance across Instagram, Facebook, LinkedIn, X, YouTube, and TikTok.',
    deliverables: [
      'Content Scheduling & Publishing',
      'Multi-Platform Asset Formatting',
      'Engagement & Profile Maintenance'
    ],
    iconSvg: socialSvg,
    bgImage: socialImg,
    category: 'Creative'
  }
];
