import { privacyPolicyData } from "./privacyPolicyData";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Política de Privacidad</h1>

      {privacyPolicyData.map((section, index) => (
        <section className="mb-6" key={index}>
          <h2 className="mb-2 text-2xl font-semibold">{section.title}</h2>
          <p>{section.content}</p>
        </section>
      ))}
      <p className="text-center">
        &copy; {new Date().getFullYear()} Vivo Vivo todos los derechos reservados
      </p>
    </div>
  );
}
