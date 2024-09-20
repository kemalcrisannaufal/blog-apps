import BlogCard from "@/components/Elements/BlogCard";
import HeaderPage from "@/components/Elements/HeaderPage";
import { fetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";
import styles from "./Dashboard.module.scss";
import BlogCardSkeleton from "@/components/Elements/BlogCard/BlogCardSkeleton";
import { motion } from "framer-motion";

const DashboardView = () => {
  const { data, isLoading } = useSWR("/api/blogs", fetcher);
  return (
    <div>
      <HeaderPage title="Dashboard" />
      <div className={styles.dashboard}>
        <div className={styles.dashboard__content}>
          {isLoading
            ? Array.from({ length: 12 }).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))
            : data.data.map((blog: any, index: number) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 100 }}
                  transition={{ delay: 0.1 * index }}
                  key={blog.id}
                >
                  <BlogCard
                    image={blog.image}
                    title={blog.title}
                    destination={`/blogs/${blog.id}`}
                  />
                </motion.div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
