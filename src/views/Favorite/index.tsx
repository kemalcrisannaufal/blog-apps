import BlogCard from "@/components/Elements/BlogCard";
import HeaderPage from "@/components/Elements/HeaderPage";
import { fetcher } from "@/lib/swr/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import styles from "./Favorite.module.scss";

const FavoriteView = () => {
  const { data }: any = useSession();

  const { data: favoritesData } = useSWR(
    `/api/favorite/${data && data.user.id}`,
    fetcher
  );

  return (
    <>
      <HeaderPage title={"Favorite"} />
      <div className={styles.favorite}>
        <div className={styles.favorite__content}>
          {favoritesData &&
            favoritesData.data.map((blog: any) => (
              <div key={blog.id}>
                <BlogCard
                  image={blog.image}
                  title={blog.title}
                  destination={`/blogs/${blog.id}`}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default FavoriteView;
