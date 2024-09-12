/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const BlogCard = ({
  image,
  title,
  destination,
}: {
  image: string;
  title: string;
  destination: string;
}) => {
  return (
    <Link href={destination}>
      <div className="w-[180px] sm:w-[260px] border rounded-lg shadow-lg overflow-hidden group hover:shadow-2xl hover:scale-110 transition">
        <div className="h-32 sm:h-40 relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover "
          />
          <div className="absolute inset-0 w-full h-40 z-10 bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center gap-2 text-white">
            <p className="text-xl font-bold">Read Blog</p>
            <FaArrowRight className="text-xl" />
          </div>
          <div className="w-full absolute left-0 bottom-0 p-4 bg-black bg-opacity-30 group-hover:hidden">
            <h2 className="text-sm text-white font-bold line-clamp-2">
              {title}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
