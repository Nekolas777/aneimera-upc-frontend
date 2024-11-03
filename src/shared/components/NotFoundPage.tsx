import { useNavigate } from "react-router-dom";
import AneimeraBanner from "../../assets/images/not-found.webp";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className='h-screen w-full flex items-center justify-center'>
      <div
        className='mx-auto max-w-[350px] p-5
        flex flex-col items-center gap-4 text-center'
      >
        <img src={AneimeraBanner} className='w-full h-72' />
        <h1 className='mt-4 text-xl sm:text-2xl font-bold text-red-700'>
          Página no encontrada
        </h1>
        <p className='leading-relaxed'>
          No pudimos encontrar la página que estabas buscando
        </p>
        <button
          onClick={() => navigate("/login", { replace: true })}
          className='mt-2 py-3 bg-blue-700 text-white px-5 rounded-2xl'
        >
          Ir a menu principal
        </button>
      </div>
    </section>
  );
};
