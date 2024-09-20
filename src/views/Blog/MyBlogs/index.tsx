import HeaderPage from "@/components/Elements/HeaderPage";
import { fetcher } from "@/lib/swr/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import styles from "./MyBlogs.module.scss";
import BlogCard from "@/components/Elements/BlogCard";
import BlogCardSkeleton from "@/components/Elements/BlogCard/BlogCardSkeleton";
import { motion } from "framer-motion";

const MyBlogsView = () => {
  const { data }: any = useSession();

  const { data: privateBlog, isLoading: isLoadingPrivate } = useSWR(
    `/api/blogs?visibility=private&userId=${data && data.user!.id}`,
    fetcher
  );

  const { data: publicBlog, isLoading: isLoadingPublic } = useSWR(
    `/api/blogs?visibility=public&userId=${data && data.user!.id}`,
    fetcher
  );

  const renderSkeletons = (count: number) =>
    Array.from({ length: count }).map((_, index) => (
      <BlogCardSkeleton key={index} />
    ));

  const renderBlogSection = (
    title: string,
    isLoading: boolean,
    blogData: any
  ) => (
    <div className={styles.myBlogs__content}>
      <h1 className={styles.myBlogs__content__title}>{title}</h1>
      <div className={styles.myBlogs__content__items}>
        {isLoading ? (
          renderSkeletons(4)
        ) : blogData && blogData.data.length > 0 ? (
          blogData.data.map((blog: any, index: number) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              key={blog.id}
            >
              <BlogCard
                image={blog.image}
                title={blog.title}
                destination={`/blogs/${blog.id}`}
              />
            </motion.div>
          ))
        ) : (
          <p>No {title.toLowerCase()} available.</p>
        )}
      </div>
    </div>
  );

  return (
    <>
      <HeaderPage title="My Blogs" />
      <div className={styles.myBlogs}>
        {renderBlogSection("Private Blogs", isLoadingPrivate, privateBlog)}
        {renderBlogSection("Public Blogs", isLoadingPublic, publicBlog)}
      </div>
    </>
  );
};

export default MyBlogsView;
