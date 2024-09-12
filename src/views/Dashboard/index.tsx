import BlogCard from "@/components/Elements/BlogCard";
import HeaderPage from "@/components/Elements/HeaderPage";
import { fetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";
import styles from "./Dashboard.module.scss";

const DashboardView = () => {
  const { data } = useSWR("/api/blogs", fetcher);

  return (
    <div>
      <HeaderPage title="Dashboard" />
      <div className={styles.dashboard}>
        <div className={styles.dashboard__content}>
          {data &&
            data.data.map((blog: any) => (
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
  );
};

export default DashboardView;
