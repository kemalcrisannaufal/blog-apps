/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { fetcher } from "@/lib/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import HeaderPage from "@/components/Elements/HeaderPage";
import styles from "./DetailBlog.module.scss";

const DetailBlogView = () => {
  const { query } = useRouter();
  const { data: blog, isLoading: blogIsLoading } = useSWR(
    `/api/blogs/${query.id!}`,
    fetcher
  );
  const { data: user, isLoading: userIsLoading } = useSWR(
    `/api/users/${blog?.data.userId}`,
    fetcher
  );

  return (
    <div>
      <HeaderPage title={"Read Blog"} />
      <div>
        {blogIsLoading || userIsLoading ? (
          <div className={styles.detaiBlog__skeleton}>
            <div className={styles.detaiBlog__skeleton__title}></div>
            <div className={styles.detaiBlog__skeleton__info}></div>
            <div className={styles.detaiBlog__skeleton__image}></div>
            <div className={styles.detaiBlog__skeleton__content}></div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailBlogView;
