import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";

interface TeamMember {
  name: string;
  title: string;
  description?: string; // Fallback string description
  descriptionRichText?: any; // Rich text raw content
  image?: string;
  imageAlt?: string;
}

interface AboutusOurTeamProps {
  title?: string;
  members?: TeamMember[];
  className?: string;
}

const AboutusOurTeam: React.FC<AboutusOurTeamProps> = ({
  title = "Our Team",
  members = [
    {
      name: "Hasan Alamouri",
      title: "Founder & Lead Engineer",
      description: "With over a decade of field experience, Hasan leads with a technician's precision and a business owner's mindset.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Hasan Alamouri, Founder & Lead Engineer"
    },
    {
      name: "Sam",
      title: "IT & Programming Specialist",
      description: "Expert in backend system programming, remote integrations, and smart automation setups.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Sam, IT & Programming Specialist"
    },
    {
      name: "Ans",
      title: "Field Supervisor",
      description: "Keeps installations running smoothly, safely, and on schedule with a focus on detail and quality.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Ans, Field Supervisor"
    }
  ],
  className = ""
}) => {
  return (
    <div className={`max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 pb-16 ${className}`}>
      <h2 className="text-3xl font-extrabold md:text-4xl font-primary text-gray-900 mb-12">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member, index) => (
          <div key={index} className="bg-white rounded-lg ">
            {member.image && (
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.imageAlt || `${member.name}, ${member.title}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
            )}
            <div className="pb-6">
              
              <h4 className="text-blue-600 text-lg font-secondary font-semibold mb-3">
                {member.title}
              </h4>
              
              {/* Rich Text Description or Fallback */}
              <div className="font-secondary text-gray-700 leading-relaxed">
                {member.descriptionRichText ? (
                  <RichText 
                    content={member.descriptionRichText}
                    renderers={{
                      p: ({ children }) => (
                        <p className="font-secondary text-gray-700 leading-relaxed mb-2">
                          {children}
                        </p>
                      ),
                      bold: ({ children }) => (
                        <strong className="font-semibold">
                          {children}
                        </strong>
                      ),
                      italic: ({ children }) => (
                        <em className="italic">
                          {children}
                        </em>
                      ),
                    }}
                  />
                ) : (
                  <p dangerouslySetInnerHTML={{ 
                    __html: member.description || '' 
                  }} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutusOurTeam;