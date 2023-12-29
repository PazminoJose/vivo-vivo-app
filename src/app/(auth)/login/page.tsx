import FormLogin from "./components/form-login";

export default function LoginPage() {
  return (
    <div className="flex w-full border-spacing-0 flex-col items-center gap-10 sm:max-w-lg sm:rounded-2xl sm:border-[.5rem] sm:border-white sm:p-5 sm:px-10 sm:shadow-2xl sm:shadow-slate-400">
      <img src="/vivo-vivo-logo.png" alt="Logo de vivo vivo" height={688} width={387} />
      <FormLogin />
    </div>
  );
}
