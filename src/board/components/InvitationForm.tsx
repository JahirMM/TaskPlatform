import { useRef, FormEvent } from "react";
import { toast } from "sonner";

interface InvitationFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function InvitationForm({ setShowForm }: InvitationFormProps) {
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!emailRef.current || !emailRef.current.value) {
      toast.error("Ingresar un correo electrónico");
      return;
    }

    console.log("Correo electrónico ingresado:", emailRef.current.value);
    setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Formulario de invitación">
      <div className="flex flex-col gap-3">
        <label htmlFor="email-input" className="text-sm text-white">
          Correo electrónico
        </label>
        <input
          ref={emailRef}
          type="email"
          id="email-input"
          name="email"
          className="px-3 py-2 text-sm text-white border rounded-lg border-action focus:border-action-hover focus:outline focus:outline-action-hover"
          placeholder="Ingrese un correo electrónico"
          aria-required="true"
          aria-describedby="email-help"
        />
        <span id="email-help" className="sr-only">
          Por favor ingrese una dirección de correo electrónico válida
        </span>
      </div>
      <button
        type="submit"
        className="text-sm mt-8 text-white w-full bg-action hover:bg-action-hover focus:ring-4 focus:ring-action font-medium rounded-lg px-5 py-2.5 me-2 mb-2 focus:outline-none"
        aria-label="Enviar invitación"
      >
        Invitar
      </button>
    </form>
  );
}

export default InvitationForm;
