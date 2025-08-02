interface ServiceAreasSectionProps {
  title?: string;
  mainArea?: string;
  areas?: string[];
  className?: string;
}

const ServiceAreasSection: React.FC<ServiceAreasSectionProps> = ({
  title = "Service Areas",
  mainArea = "Atlanta Metro Area including",
  areas = [
    "Alpharetta", "Marietta", "Sandy Springs", "Decatur", 
    "Roswell", "Norcross", "and more"
  ],
  className = ""
}) => {
  return (
    <div className={`max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 pb-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-primary text-gray-900 mb-8">
        {title}
      </h2>
      <div className="bg-gray-50 rounded-lg p-6 md:p-8">
        <p className="text-lg font-secondary text-gray-700 mb-4">
          {mainArea}:
        </p>
        <div className="flex flex-wrap gap-3">
          {areas.map((area, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceAreasSection;