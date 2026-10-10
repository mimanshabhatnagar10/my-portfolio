/**
 * Certifications Data for Mimansha Bhatnagar
 * Strict No-Fabrication: Contains only user's verified Microsoft certifications.
 * Certificate image files can be dropped directly into the public/certificates/ folder.
 */
export const certifications = [
  {
    id: "azure-ai-900",
    name: "Microsoft Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft",
    code: "AI-900",
    description: "Validates foundational knowledge of Machine Learning (ML) and Artificial Intelligence (AI) concepts and related Microsoft Azure cloud services.",
    topicsCovered: [
      "Artificial Intelligence workloads and considerations",
      "Fundamental principles of Machine Learning on Azure",
      "Features of Computer Vision workloads on Azure",
      "Natural Language Processing (NLP) workloads on Azure",
      "Features of Conversational AI workloads on Azure"
    ],
    // The user will add the actual certificate image file here in public/certificates/
    imageSrc: "/certificates/azure-ai-900.png",
    fallbackLabel: "Azure AI-900 Certificate Preview (Click to view details)",
    // Optional verification link (user can paste their official Microsoft Learn / Credly credential URL here)
    verificationUrl: "", 
    badgeColor: "#0078D4"
  },
  {
    id: "azure-az-900",
    name: "Microsoft Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    code: "AZ-900",
    description: "Validates foundational knowledge of cloud concepts, Azure core architectural components, Azure services, management tools, security, and compliance.",
    topicsCovered: [
      "Cloud concepts (IaaS, PaaS, SaaS, public/private cloud)",
      "Azure core architectural components and compute/storage services",
      "Azure management and governance tools",
      "Security, privacy, and compliance features in Azure"
    ],
    // The user will add the actual certificate image file here in public/certificates/
    imageSrc: "/certificates/azure-az-900.png",
    fallbackLabel: "Azure AZ-900 Certificate Preview (Click to view details)",
    verificationUrl: "",
    badgeColor: "#0078D4"
  }
];
