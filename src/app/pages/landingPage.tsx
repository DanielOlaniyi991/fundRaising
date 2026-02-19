import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import CTASection from '../components/CTASection';
import LearnMoreSection from '../components/LearnMoreSection';

const LandingPage = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <AboutSection />
            <CTASection />
            <LearnMoreSection />
        </div>
    );
};

export default LandingPage;
