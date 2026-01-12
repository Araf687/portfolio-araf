// --------------------
// ProjectItem Component
// --------------------
interface ProjectItemProps {
  title: string;
  description: string;
  thumbnail: string;
  live_url: string;
  github_url: string;
}

export const ProjectItem = ({
  title,
  description,
  thumbnail,
  live_url,
  github_url,
}: ProjectItemProps) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img
        src={thumbnail}
        alt={title}
        className="w-full lg:h-80 h-26 object-cover"
      />
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        {/* <p className="text-gray-400 text-sm mt-1">{description}</p> */}
        <div className="flex gap-4 mt-3">
          {live_url && (
            <a
              href={live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-sm"
            >
              Live
            </a>
          )}
          {github_url && (
            <a
              href={github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-sm"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};