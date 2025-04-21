import { AuthButtons } from "@/auth/components/AuthButtons";
import SignAuthButton from "@/auth/components/SignInAuthButton";

export default async function Home() {
  return (
    <main className="font">
      <header>
        <div>TaskPlatfrom</div>
        <AuthButtons />
      </header>
      {/* HERO  */}
      <section>
        <h1>
          <span>Gestión de proyectos sin esfuerzo</span>
          <span>Colabora de manera sencilla</span>
        </h1>
        <p>
          TaskPlatfrom es la manera más eficiente de organizar tus tareas. Crea
          espacios de trabajo, tableros y tareas en segundos. Invita a tu equipo
          y colabora sin complicaciones.
        </p>
        <SignAuthButton />
      </section>
    </main>
  );
}
