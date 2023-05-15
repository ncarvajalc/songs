import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function Suggest() {
  const [inputs, setInputs] = useState({
    name: "",
    suggestedBy: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    suggestedBy: "",
  });

  const [loading, setLoading] = useState(false);

  const [successfullSubmit, setSuccessfullSubmit] = useState(false);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value.trimStart() }));
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!errors.name) {
      suggestCategory(inputs);
      setInputs({
        name: "",
        suggestedBy: "",
      });
    }
  };
  const handleErrorCheck = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors((errors) => ({ ...errors, [name]: "Este campo es requerido" }));
    } else {
      setErrors((errors) => ({ ...errors, [name]: "" }));
    }
  };

  return (
    <Layout>
      <div>
        <h1>Sugerir categoría</h1>
        {!successfullSubmit && (
          <p>
            Indícanos cúal es la categoría que deseas incluir. Está será
            analizada por nuestro equipo para ser incluida dentro de la
            aplicación. Si deseas, puedes incluir un nombre o pseudónimo para
            que los demás sepan que fuiste tú quien la sugirió.
          </p>
        )}{" "}
        {successfullSubmit && !loading && <p>¡Gracias por tu sugerencia! 🎉</p>}
        {!successfullSubmit && !loading && (
          <form className="flex flex-col gap-1" onSubmit={handleFormSubmit}>
            <label htmlFor="name">Categoría *</label>
            <textarea
              onChange={handleInputChange}
              name="name"
              rows={2}
              className="resize-none mb-1"
              id="name"
              onBlur={handleErrorCheck}
              required
              value={inputs.name}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mb-0">{errors.name}</p>
            )}
            <label htmlFor="suggestedBy">Nombre o pseudónimo</label>
            <input
              onChange={handleInputChange}
              type="text"
              name="suggestedBy"
              id="suggestedBy"
              value={inputs.suggestedBy}
            />
            <button className="button">Enviar</button>
          </form>
        )}
        {loading && (
          <div>
            <p>Enviando sugerencia...</p>
            <Loader />
          </div>
        )}
        <Link href="/categories/random"> ← Regresar</Link>
      </div>
    </Layout>
  );

  function suggestCategory(inputs: { name: string; suggestedBy: string }) {
    setLoading(true);
    fetch("/api/suggestCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputs.name,
        suggestedBy: inputs.suggestedBy,
      }),
    })
      .then((res) => res.json())
      .then((_) => {
        setLoading(false);
        setSuccessfullSubmit(true);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert("Algo salió mal, por favor intenta de nuevo");
      });
  }
}
