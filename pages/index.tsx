import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div id="intro">
        <h1>Canciones en el camino</h1>
        <p>
          Esta aplicación nace de los largos tiempos de viaje en un trancón de
          Bogotá, pero también de la buena compañía que puede haber en esos
          extensos trayectos. Espero que lo disfruten así como mis pasajeros de
          Wheels y yo lo hemos hecho 🚙 🎶.
        </p>
        <Link href="/categories/random" className="button">
          Comenzar
        </Link>
      </div>
      <footer className="mt-auto" id="contacto">
        <p>
          Hecho con ❤️ desde 🇨🇴 por{" "}
          <a href="https://www.instagram.com/nipets/?hl=es-la">@nipets</a>
        </p>
      </footer>
    </Layout>
  );
}
