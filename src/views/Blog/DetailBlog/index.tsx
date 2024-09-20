/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { fetcher } from "@/lib/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import HeaderPage from "@/components/Elements/HeaderPage";
import styles from "./DetailBlog.module.scss";
import { FaHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";

const DetailBlogView = () => {
  const { query } = useRouter();
  const { data }: { data: any } = useSession();
  const { data: blog, isLoading: blogIsLoading } = useSWR(
    `/api/blogs/${query.id!}`,
    fetcher
  );
  const { data: user, isLoading: userIsLoading } = useSWR(
    `/api/users/${blog?.data.userId}`,
    fetcher
  );

  const handleLike = async (event: any) => {
    event.preventDefault();

    try {
      const payloadData: { idUser: any; idBlog: any } = {
        idUser: data.user.id,
        idBlog: query.id,
      };

      const result = await fetch("/api/favorite/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadData),
      });
      if (result.status === 200) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <HeaderPage title={"Read Blog"} />
      <div>
        {blogIsLoading || userIsLoading ? (
          <div className={styles.detaiBlog__skeleton}>
            <div className={styles.detaiBlog__skeleton__title} />
            <div className={styles.detaiBlog__skeleton__info} />
            <div className={styles.detaiBlog__skeleton__image} />
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                className={styles.detaiBlog__skeleton__content}
                key={index}
              />
            ))}
          </div>
        ) : (
          <div className={styles.detaiBlog}>
            <h1 className={styles.detaiBlog__title}>
              {blog && blog.data.title}
            </h1>
            <div className={styles.detaiBlog__info}>
              <p className={styles.detaiBlog__author}>
                By {user && user.data.fullname}
              </p>
              <p className={styles.detaiBlog__date}>
                - {blog && new Date(blog.data.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className={styles.detaiBlog__image}>
              <img
                src={blog && blog.data.image}
                alt={blog && blog.data.title}
                className={styles.detaiBlog__image__img}
              />
            </div>
            <div className={styles.detaiBlog__content}>
              <p className={styles.detaiBlog__content__text}>
                {blog && blog.data.content}
              </p>
            </div>

            <div className={styles.detaiBlog__likeSection}>
              <form onSubmit={handleLike}>
                <button
                  className={styles.detaiBlog__likeSection__button}
                  type="submit"
                >
                  <FaHeart
                    className={styles.detaiBlog__likeSection__button__icon}
                  />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailBlogView;
