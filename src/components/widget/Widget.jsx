import Card from "components/card";

const Widget = ({ icon, title, subtitle }) => {
  return (
    <Card extra="!flex-row flex-grow items-start rounded pt-4  shadow-5xl px-[46px] ">
      <div className="flex w-auto flex-row items-center">
        <div className="rounded bg-green-900 p-[6px] w-10 h-10 flex justify-center align-center">
          <span className="flex items-center text-brand-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-secondaryColor font-poppins">{title}</p>
        <h4 className="text-2xl font-semibold text-secondaryColor leading-[68px] font-poppins dark:text-white">
          {subtitle}
        </h4>
      </div>
    </Card>
  );
};

export default Widget;
