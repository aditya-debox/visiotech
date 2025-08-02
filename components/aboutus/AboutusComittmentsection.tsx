interface CommitmentSectionProps {
  title?: string;
  content?: string;
  className?: string;
}

const CommitmentSection: React.FC<CommitmentSectionProps> = ({
  title = "Our Commitment",
  content = "We don't just install devices—we build long-term partnerships by offering support, maintenance, and upgrades that evolve with your business.",
  className = ""
}) => {
  return (
    <div className={`max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 pb-16 ${className}`}>
      <div className="bg-blue-600 rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-primary text-white mb-6">
          {title}
        </h2>
        <p className="text-xl font-secondary text-blue-100 leading-relaxed max-w-4xl mx-auto">
          {content}
        </p>
      </div>
    </div>
  );
};

export default CommitmentSection;