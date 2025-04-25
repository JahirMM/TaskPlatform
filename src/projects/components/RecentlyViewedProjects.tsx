import ProjectItem from "@/projects/components/ProjectItem";
import ClockIcon from "@/icons/ClockIcon";

function RecentlyViewedProjects() {
  return (
    <section aria-labelledby="recently-viewed" className="mt-8 mb-24 sm:mt-16">
      <header className="flex items-center gap-4 mb-8">
        <ClockIcon className="text-white size-5" />
        <h2
          id="recently-viewed"
          className="text-lg font-semibold text-white sm:text-xl"
        >
          Visto recientemente
        </h2>
      </header>
      <div className="grid grid-cols-1 gap-8 place-items-center md:grid-cols-2 xl:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <ProjectItem />
        ))}
      </div>
    </section>
  );
}

export default RecentlyViewedProjects;
