import { getAllPosts } from "@/src/lib/blog";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { DataFlowSection } from "@/components/DataFlowSection";
import { ServicesSection } from "@/components/ServicesSection";
import ProjectSection from "@/components/ProjectSection";
import { BlogSection } from "@/components/BlogSection";
import { PartnersSection } from "@/components/PartnersSection";
import { Footer } from "@/components/Footer";

export default function Home() {
    // Fetch blog posts on the server
    const postsVi = getAllPosts('vi');
    const postsEn = getAllPosts('en');

    return (
        <main className="min-h-screen flex flex-col">
            <Header />
            <HeroSection />
            <DataFlowSection />
            <ServicesSection />
            <PartnersSection />
            <ProjectSection />
            <BlogSection postsVi={postsVi} postsEn={postsEn} />
            <Footer />
        </main>
    );
}
