/**
 * Academic Highlights, Verified Certificates & Achievements
 * Mimansha Bhatnagar
 */
import { certAz900DataUri, certAi900DataUri, certHerizonDataUri, certNssDataUri } from './certificateImages.js';

export const galleryCategories = [
  "All", 
  "Certificates", 
  "College Achievements"
];

export const galleryItems = [
  {
    id: "cert-az-900",
    title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    category: "Certificates",
    caption: "Official Microsoft certification validating fundamental knowledge of cloud concepts, Azure architectural services, security, privacy, and compliance. Issued: November 19, 2025.",
    imageSrc: certAz900DataUri || "/public/images/certificates/az-900.png",
    altSrc: "/images/certificates/az-900.png",
    pdfUrl: "/public/certificates/azure-az-900.pdf",
    verificationUrl: "https://verify.certiport.com",
    verificationCode: "waNb9-Fa44",
    badgeLabel: "Microsoft Certified"
  },
  {
    id: "cert-ai-900",
    title: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
    category: "Certificates",
    caption: "Official Microsoft certification validating artificial intelligence workloads, Machine Learning principles on Azure, Computer Vision, and NLP. Issued: April 28, 2026.",
    imageSrc: certAi900DataUri || "/public/images/certificates/ai-900.png",
    altSrc: "/images/certificates/ai-900.png",
    pdfUrl: "/public/certificates/azure-ai-900.pdf",
    verificationUrl: "https://verify.certiport.com",
    verificationCode: "PyH7-uScT",
    badgeLabel: "Microsoft Certified"
  },
  {
    id: "ach-herizon-2",
    title: "HERizon 2026 — Certificate of Appreciation",
    category: "College Achievements",
    caption: "Awarded by University Institute of Engineering, Chandigarh University in collaboration with IEEE India Council for outstanding contribution as Event Management (The Paints), March 27–28, 2026.",
    imageSrc: certHerizonDataUri || "/public/images/achievements/herizon-certificate.png",
    altSrc: "/images/achievements/herizon-certificate.png",
    verificationUrl: "",
    verificationCode: "Roll No: 25BAI10036",
    badgeLabel: "Chandigarh University · IEEE"
  },
  {
    id: "ach-nss-merit",
    title: "National Service Scheme (NSS) — Merit Certificate",
    category: "College Achievements",
    caption: "Awarded by Ministry of Youth Affairs & Sports, Government of India for exemplary social service as NSS Volunteer (2023–2025) and attending NSS Special Programme Camps from Dec 28, 2024 to Jan 03, 2025.",
    imageSrc: certNssDataUri || "/public/images/achievements/nss-merit-certificate.jpg",
    altSrc: "/images/achievements/nss-merit-certificate.jpg",
    verificationUrl: "",
    verificationCode: "Volunteer Code: HR/KT/SCH/SF/2023/9/16 · S.L. No. 15",
    badgeLabel: "Government of India · NSS"
  }
];

export const galleryInstructions = {
  folderPath: "public/images/gallery/",
  supportedFormats: ["JPG", "PNG", "WEBP"],
  steps: [
    "Drop your certificates and photos into public/images/certificates/ or public/images/achievements/",
    "Save the file with a clear name (e.g., certificate.jpg)",
    "Your certificates will render automatically in this gallery with full lightbox previews!"
  ]
};
