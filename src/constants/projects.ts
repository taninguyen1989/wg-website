import { Landmark, Factory, Cpu, type LucideIcon } from "lucide-react";

export interface Project {
    id: string;
    category: string;
    icon: LucideIcon;
    title: {
        vi: string;
        en: string;
    };
    description: {
        vi: string;
        en: string;
    };
    image: string;
}

export const PROJECTS_DATA: Project[] = [
    {
        id: "banking",
        category: "Banking",
        icon: Landmark,
        title: {
            vi: "Hệ thống Quản lý Tài liệu Ngân hàng",
            en: "Digital Banking Document Management"
        },
        description: {
            vi: "Số hóa và tự động hóa quy trình tín dụng, mở tài khoản cho ngân hàng thương mại lớn.",
            en: "Digitizing and automating credit processes and account opening for major commercial banks."
        },
        image: "/projects/banking.png"
    },
    {
        id: "manufacturing",
        category: "Manufacturing",
        icon: Factory,
        title: {
            vi: "Quản trị Sản xuất Thông minh (MES/ERP)",
            en: "Smart Manufacturing Management (MES/ERP)"
        },
        description: {
            vi: "Tích hợp hệ thống ERP giúp theo dõi tiến độ sản xuất và quản lý kho theo thời gian thực.",
            en: "Integrating ERP systems to track production progress and manage inventory in real-time."
        },
        image: "/projects/manufacturing.png"
    },
    {
        id: "technology",
        category: "AI",
        icon: Cpu,
        title: {
            vi: "Trợ lý ảo AI doanh nghiệp",
            en: "Enterprise AI Assistant"
        },
        description: {
            vi: "Triển khai LLM nội bộ hỗ trợ tìm kiếm tri thức và hỗ trợ khách hàng tự động.",
            en: "Deploying internal LLMs for knowledge retrieval and automated customer support."
        },
        image: "/projects/technology.png"
    }
];
