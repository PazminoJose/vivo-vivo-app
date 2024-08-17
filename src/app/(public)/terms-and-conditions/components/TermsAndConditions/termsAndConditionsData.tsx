import Link from "next/link";

export const termsAndConditionsData = [
  {
    title: "1. Aceptación de los Términos",
    content: (
      <p>
        Al acceder y utilizar nuestros servicios, aceptas y acuerdas cumplir con estos términos y
        condiciones, junto con nuestra{" "}
        <Link className="text-blue-400 hover:text-blue-300" href="/privacy-policy">
          política de privacidad
        </Link>
        . Si no estás de acuerdo con alguno de los términos, te sugerimos que no utilices nuestros
        servicios.
      </p>
    )
  },
  {
    title: "2. Modificación de los Términos",
    content:
      "Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio será efectivo inmediatamente después de su publicación. Es tu responsabilidad revisar periódicamente estos términos para estar al tanto de cualquier modificación."
  },
  {
    title: "3. Política de Privacidad",
    content:
      "Nuestra Política de Privacidad explica cómo recopilamos, utilizamos y protegemos tu información personal. Al utilizar nuestros servicios, aceptas las prácticas descritas en dicha política."
  },
  {
    title: "4. Información Recopilada",
    content:
      "Recopilamos información personal de nuestros usuarios, la cual podrá ser utilizada por miembros de la Policía Nacional y entes de control, además de otros usuarios designados en caso de emergencia. Esta información no será compartida con terceros fuera de estas excepciones, salvo lo dispuesto en nuestra política de privacidad."
  },
  {
    title: "5. Ubicación Exacta",
    content:
      "En caso de emergencia, la ubicación exacta de un usuario podrá ser visible para los usuarios registrados como núcleo de confianza, así como para miembros de la Policía Nacional y entes de control. Esto garantiza que las autoridades pertinentes y personas designadas puedan acceder a esta información en situaciones críticas."
  },
  {
    title: "6. Manejo de la Información",
    content:
      "Nos comprometemos a no compartir tu información personal con terceros, excepto cuando sea necesario por mandato legal, para proteger nuestros derechos y propiedad, o para ser utilizada por la Policía Nacional y entes de control en situaciones que lo requieran."
  },
  {
    title: "8. Uso Aceptable",
    content:
      "Al utilizar nuestros servicios, te comprometes a no hacer un uso indebido de la información proporcionada por otros usuarios. Cualquier uso no autorizado o ilegal de la información será motivo de terminación de tu acceso a los servicios y, si es necesario, de acción legal."
  },
  {
    title: "9. Limitación de Responsabilidad",
    content:
      "No nos hacemos responsables de los daños directos, indirectos, incidentales o consecuentes que puedan resultar del uso de nuestros servicios o de la información contenida en ellos."
  },
  {
    title: "10. Jurisdicción y Ley Aplicable",
    content:
      "Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes aplicables en la jurisdicción en la que operamos. Cualquier disputa relacionada con estos términos será resuelta en los tribunales competentes de dicha jurisdicción."
  },
  {
    title: "11. Contacto",
    content:
      "Si tienes alguna pregunta o inquietud sobre estos términos y condiciones, puedes contactarnos a través de la información de contacto proporcionada en nuestra plataforma."
  }
];
