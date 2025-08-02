import { RichText } from "@graphcms/rich-text-react-renderer";

interface OurStorySectionProps {
  title?: string;
  content?: any[]; // Rich text raw content array
  fallbackContent?: string[]; // Fallback string content
  className?: string;
}

const OurStorySection: React.FC<OurStorySectionProps> = ({
  title = "Our Story",
  content,
  fallbackContent = [
    "Founded in 2016, Visiotech was built with a simple but powerful mission: to help businesses secure their spaces with technology that works reliably and efficiently. Our founder, Hasan Alamouri, combined his deep expertise in electro-mechanical engineering with his passion for practical innovation to offer solutions that truly solve real-world problems.",
    "Today, Visiotech is a trusted name in the Atlanta area, known for delivering enterprise-grade security camera installations, smart surveillance systems, audio-visual setups, and low-voltage integrations tailored to commercial needs."
  ],
  className = ""
}) => {
  return (
    <div className={`max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 pb-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-primary text-gray-900 mb-8">
        {title}
      </h2>
      <div className="space-y-6">
        {content && content.length > 0 ? (
          content.map((richtextdata, index) => (
            <div key={index}>
              <RichText 
                content={richtextdata} 
                renderers={{ 
                  p: ({children}) => ( 
                    <p className="text-lg font-secondary text-gray-700 leading-relaxed">
                      {children}
                    </p> 
                  ) 
                }} 
              />
            </div>
          ))
        ) : (
          fallbackContent.map((paragraph, index) => (
            <p key={index} className="text-lg font-secondary text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default OurStorySection;