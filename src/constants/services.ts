import { Brain, Database, FileText } from "lucide-react";

export const SERVICES_DATA = [
    {
        id: "ecm",
        icon: FileText,
        title: "DocuWare (ECM)",
        description: {
            vi: "Chuyển đổi số văn phòng toàn diện. Số hóa tài liệu, tự động hóa quy trình phê duyệt và xây dựng môi trường làm việc không giấy tờ hiệu quả.",
            en: "Comprehensive digital office transformation. Digitize documents, automate approval workflows, and build an efficient paperless work environment."
        }
    },
    {
        id: "erp",
        icon: Database,
        title: "ERP (SAP/Epicor)",
        description: {
            vi: "Quản trị nguồn lực doanh nghiệp tối ưu. Tích hợp dữ liệu tài chính, sản xuất và chuỗi cung ứng vào một hệ thống thống nhất và minh bạch.",
            en: "Optimal enterprise resource planning. Integrate financial, production, and supply chain data into a unified and transparent system."
        }
    },
    {
        id: "ai",
        icon: Brain,
        title: "AI Integration",
        description: {
            vi: "Sức mạnh trí tuệ nhân tạo. Tự động hóa các tác vụ lặp lại, phân tích dữ liệu chuyên sâu và hỗ trợ ra quyết định kinh doanh chính xác.",
            en: "The power of artificial intelligence. Automate repetitive tasks, perform in-depth data analysis, and support accurate business decision-making."
        }
    }
];
