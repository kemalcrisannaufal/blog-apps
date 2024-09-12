import { useRouter } from "next/router";
import Button from "../Button";

const HeaderPage = ({ title }: { title: string }) => {
  const { push } = useRouter();
  return (
    <div className="mt-14 md:mt-0 w-full h-16 p-5 md:p-10 flex justify-between items-center border">
      <div>
        <h1 className="text-lg md:text-2xl font-bold text-neutral-700">
          {title}
        </h1>
      </div>
      <div>
        <Button
          type="button"
          label="Add New Blog"
          onClick={() => push("/add-new-blog")}
          classname="text-xs md:text-sm px-3 md:px-5"
        ></Button>
      </div>
    </div>
  );
};

export default HeaderPage;
