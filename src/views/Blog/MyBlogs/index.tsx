import HeaderPage from "@/components/Elements/HeaderPage";
import { fetcher } from "@/lib/swr/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import styles from "./MyBlogs.module.scss";
import BlogCard from "@/components/Elements/BlogCard";

const MyBlogsView = () => {
  const { data }: any = useSession();
  const { data: privateBlog } = useSWR(
    `/api/blogs?visibility=private&userId=${data && data.user!.id}`,
    fetcher,
  );
  const { data: publicBlog } = useSWR(
    `/api/blogs?visibility=public&userId=${data && data.user!.id}`,
    fetcher,
  );
  return (
    <>
      <HeaderPage title="My Blogs" />
      <div className={styles.myBlogs}>
        <div className={styles.myBlogs__content}>
          <h1 className={styles.myBlogs__content__title}>Private Blogs</h1>
          <div className={styles.myBlogs__content__items}>
            {privateBlog &&
              privateBlog.data.map((blog: any) => (
                <BlogCard
                  image={blog.image}
                  title={blog.title}
                  key={blog.id}
                  destination={`/blogs/${blog.id}`}
                />
              ))}
          </div>
        </div>
        <div className={styles.myBlogs__content}>
          <h1 className={styles.myBlogs__content__title}>Public Blogs</h1>
          <div className={styles.myBlogs__content__items}>
            {publicBlog &&
              publicBlog.data.map((blog: any) => (
                <BlogCard
                  image={blog.image}
                  title={blog.title}
                  key={blog.id}
                  destination={`/blogs/${blog.id}`}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBlogsView;
