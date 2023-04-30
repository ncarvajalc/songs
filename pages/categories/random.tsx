import Layout from "@/components/Layout";

import { db } from "@/utils/mongodb";
import { Category } from "./id";

import React from "react";
import Loader from "@/components/Loader";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LikeDislikeButtons from "@/components/LikeDislikeButtons";
import Link from "next/link";

export interface HomeProps {
  categories: Array<Category>;
}

export async function getStaticProps() {
  const collectionName = "categories";
  const categories = await db.collection(collectionName).find({}).toArray();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}

const loadingStates = {
  initialState: "Obtener una categoría",
  loadingState: "Obteniendo...",
  finalState: "Obtener otra categoría",
};

export default function Random({ categories }: HomeProps) {
  const [loadingState, setLoadingState] = React.useState(
    loadingStates.initialState
  );
  const [likedCategories, setLikedCategories] = React.useState<Category[]>([]);
  const [dislikedCategories, setDislikedCategories] = React.useState<
    Category[]
  >([]);
  const [randomCategory, setRandomCategory] = React.useState<Category>();

  const handleGetRandomCategory = () => {
    setLoadingState(loadingStates.loadingState);
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    const waitTime = 800;
    setTimeout(() => {
      setLoadingState(loadingStates.finalState);
      setRandomCategory(randomCategory);
    }, waitTime);
  };

  const getTitle = () => {
    switch (loadingState) {
      case loadingStates.initialState:
        return "Presiona el botón para obtener una categoría";
      case loadingStates.loadingState:
        return "Buscando entre las categorías";
      case loadingStates.finalState:
        return "Presiona el botón para obtener otra categoría";
      default:
        return "Presiona el botón para comenzar";
    }
  };

  const placeHolderImage = (
    <div className=" flex flex-col justify-center h-32">
      <HelpOutlineIcon
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );

  const getCentralContent = () => {
    switch (loadingState) {
      case loadingStates.initialState:
        return placeHolderImage;
      case loadingStates.loadingState:
        return (
          <div className="h-32">
            <Loader />
          </div>
        );
      case loadingStates.finalState:
        return (
          <div className=" flex flex-col justify-center">
            <p className="caption">{randomCategory?.name}</p>
            <LikeDislikeButtons
              randomCategory={randomCategory}
              likedCategories={likedCategories}
              dislikedCategories={dislikedCategories}
              setLikedCategories={setLikedCategories}
              setDislikedCategories={setDislikedCategories}
            />
          </div>
        );
      default:
        return placeHolderImage;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center text-center">
        <h1>{getTitle()}</h1>
        {getCentralContent()}
        <button className="button my-4" onClick={handleGetRandomCategory}>
          {loadingState}
        </button>
        <Link href="/" className="no-underline">
          ← Regresar a inicio
        </Link>
      </div>
    </Layout>
  );
}
