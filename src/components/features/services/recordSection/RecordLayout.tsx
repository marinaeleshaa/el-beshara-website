import MyBtn from "@/components/ui/MyBtn";
import DynamicIcon from "@/hooks/DynamicIconHook";
import { IService } from "@/lib/Interfaces/ServiceInterface";
import { useTranslations } from "next-intl";

const RecordLayout = () => {
  const t = useTranslations("ourServices");
  const recordData = t.raw("servicesData.record") as IService;
  return (
    <div className="flex flex-col gap-8 items-center  md:flex-row lg:p-8 md:p-6 p-2">
      {/* left */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 rounded-lg">
        {recordData.points.map((point, index) => (
          <div
            key={index}
            className="w-full flex relative justify-center items-center gap-4 p-5 pt-8 rounded-lg bg-secondary"
          >
            <p className="text-xl absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:text-3xl bg-primary rounded-lg text-primary-foreground p-2">
              <DynamicIcon iconName={point.icon} />
            </p>
            <h3 className="text-lg md:text-xl capitalize">{point.label}</h3>
          </div>
        ))}
      </div>
      {/* right */}
      <div className="w-full md:w-1/2 flex flex-col space-y-4 shrink-0">
        <h2 className="text-3xl w-fit font-bold text-primary capitalize relative animated-underline  mb-4">
          {recordData.title}
        </h2>
        <p className="text-foreground">{recordData.subtitle}</p>
        <p>{recordData.description}</p>
        <div className="bg-secondary  flex flex-col md:flex-row justify-evenly items-center gap-2 p-2 w-full rounded-lg">
          {recordData.statistics.map((item, index) => (
            <div
              key={index}
              className="flex flex-col  text-center items-center justify-evenly gap-1 text-secondary-foreground "
            >
              <p className="text-xl font-bold">{item.value}</p>
              <p className="text-sm ">{item.label}</p>
            </div>
          ))}
        </div>
        <MyBtn text="book your session now" href="/contact" variant="primary" width="full" />
      </div>
    </div>
  );
};

export default RecordLayout;
