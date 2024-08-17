import { termsAndConditionsData } from "./termsAndConditionsData";

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Términos y Condiciones de Uso</h1>

      {termsAndConditionsData.map((section, index) => (
        <section className="mb-6" key={index}>
          <h2 className="mb-2 text-2xl font-semibold">{section.title}</h2>
          {typeof section.content === "string" ? <p>{section.content}</p> : section.content}
        </section>
      ))}
      <p className="text-center">
        &copy; {new Date().getFullYear()} Vivo Vivo todos los derechos reservados
      </p>
    </div>
  );
}
