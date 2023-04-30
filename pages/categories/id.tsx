import Layout from "@/components/Layout";
import Link from "next/link";

// Connect to mongodb
import { db } from "@/utils/mongodb";

export interface Category {
  _id: string;
  name: string;
  likes: number;
  dislikes: number;
}

// const getCategoryData = async (id: string) => {
//   const collectionName = "categories";
//   const category = await db.collection(collectionName).findOne({ id: id });
//   return category;
// };

// export async function getStaticProps({ params }: { params: { id: string } }) {
//   const postData = getCategoryData(params.id);
//   return {
//     props: {
//       postData,
//     },
//   };
// }

export default function Category() {
  return (
    <Layout>
      <div>
        <h1>La categoría es...</h1>
        <p>{}</p>
        <Link href="categories/random"> ← Regresar</Link>
      </div>
    </Layout>
  );
}
