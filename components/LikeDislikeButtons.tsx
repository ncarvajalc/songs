import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { Category } from "@/pages/categories/id";
import React from "react";

interface LikeDislikeButtonsProps {
  likedCategories: Category[];
  dislikedCategories: Category[];
  setLikedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setDislikedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  randomCategory: Category | undefined;
}

export default function LikeDislikeButtons({
  likedCategories,
  dislikedCategories,
  setLikedCategories,
  setDislikedCategories,
  randomCategory,
}: LikeDislikeButtonsProps) {
  const [liked, setLiked] = React.useState(false);
  const [disliked, setDisliked] = React.useState(false);

  React.useEffect(() => {
    setLiked(false);
    setDisliked(false);
    if (randomCategory) {
      const isLiked = likedCategories.some(
        (category) => category._id === randomCategory._id
      );
      const isDisliked = dislikedCategories.some(
        (category) => category._id === randomCategory._id
      );
      setLiked(isLiked);
      setDisliked(isDisliked);
    }
  }, [randomCategory, likedCategories, dislikedCategories]);

  const handleLike = () => {
    if (disliked) {
      likeCategory(randomCategory);
      setDislikedCategories((prevDislikedCategories: Category[]) => {
        if (randomCategory) {
          return prevDislikedCategories.filter(
            (category) => category._id !== randomCategory._id
          );
        }
        return prevDislikedCategories;
      });
    }
    if (!liked) {
      likeCategory(randomCategory);
      setLikedCategories((prevLikedCategories: Category[]) => {
        if (randomCategory) {
          return [...prevLikedCategories, randomCategory];
        }
        return prevLikedCategories;
      });
    } else {
      neutralFromLike(randomCategory);
      setLiked(false);
      setLikedCategories((prevLikedCategories: Category[]) => {
        if (randomCategory) {
          return prevLikedCategories.filter(
            (category) => category._id !== randomCategory._id
          );
        }
        return prevLikedCategories;
      });
    }
  };

  const handleDislike = () => {
    if (liked) {
      dislikeCategory(randomCategory);
      setLikedCategories((prevLikedCategories: Category[]) => {
        if (randomCategory) {
          return prevLikedCategories.filter(
            (category) => category._id !== randomCategory._id
          );
        }
        return prevLikedCategories;
      });
    }
    if (!disliked) {
      dislikeCategory(randomCategory);
      setDislikedCategories((prevDislikedCategories: Category[]) => {
        if (randomCategory) {
          return [...prevDislikedCategories, randomCategory];
        }
        return prevDislikedCategories;
      });
    } else {
      neutralFromDislike(randomCategory);
      setDisliked(false);
      setDislikedCategories((prevDislikedCategories: Category[]) => {
        if (randomCategory) {
          return prevDislikedCategories.filter(
            (category) => category._id !== randomCategory._id
          );
        }
        return prevDislikedCategories;
      });
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 ">
      <button
        className={`button-like-dislike ${liked && "pressed"}`}
        onClick={handleLike}
      >
        <ThumbUpOffAltIcon />
      </button>
      <button
        className={`button-like-dislike ${disliked && "pressed"}`}
        onClick={handleDislike}
      >
        <ThumbDownOffAltIcon />
      </button>
      {/* { Tool tip on hover} */}
      <button
        title="Los botones de me gusta / no me gusta sirven para saber qué categorías
        prefieres y cuáles no. Así podemos dar mejores recomendaciones en el
        futuro"
        className="button-help"
      >
        ?
      </button>
    </div>
  );
}

function likeCategory(randomCategory: Category | undefined) {
  fetch("/api/likeCategory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryId: randomCategory?._id,
    }),
  });
}

function dislikeCategory(randomCategory: Category | undefined) {
  fetch("/api/dislikeCategory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryId: randomCategory?._id,
    }),
  });
}
function neutralFromLike(randomCategory: Category | undefined) {
  fetch("/api/neutralFromLike", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryId: randomCategory?._id,
    }),
  });
}

function neutralFromDislike(randomCategory: Category | undefined) {
  fetch("/api/neutralFromDislike", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryId: randomCategory?._id,
    }),
  });
}
