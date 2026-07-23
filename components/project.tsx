import type { ProjectType } from "@/types/types";

type Props = {
  project: ProjectType;
};

export default function Project({ project }: Props) {
  return (
    <a href={project.url}>
      <div className="bg-stone-900 rounded-2xl text-left text-stone-100 border border-stone-100 mt-4 md:mt-8 hover:shadow-lg shadow-sky-500/10 w-full pb-2 md:pb-4">
        <img
          src={`/assets/covers/${project.cover}`}
          alt="trip"
          className="bg-clip-padding h-50 w-full rounded-2xl"
        />
        <h2 className="text-2xl md:text-3xl mt-2 ml-4">{project.title}</h2>
        <p className="text-sm md:text-lg md:mt-1 mx-4 mb-2">
          {project.description}
        </p>
        <div className="flex flex-wrap mx-4 gap-3">
          {project.languages.map((language) => (
            <img
              key={language}
              src={`/assets/languages/${language}.svg`}
              alt={language}
              width="30"
            />
          ))}
        </div>
      </div>
    </a>
  );
}
