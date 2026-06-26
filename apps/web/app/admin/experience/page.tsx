import { getExperiences } from "../../actions/experience";
import ExperienceClient from "./experience-client";

export default async function ExperienceAdminPage() {
  const experiences = await getExperiences();

  return (
    <div className="flex-1 w-full flex flex-col gap-6 md:gap-8 p-4 md:p-10 pt-6 md:pt-10 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
          Experience Management
        </h1>
        <p className="text-muted-foreground">
          Manage your professional timeline. You can add, edit, or delete experience entries here.
        </p>
      </div>

      <ExperienceClient initialExperiences={experiences} />
    </div>
  );
}
