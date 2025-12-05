import ContactData from "@/data/ContactData";

const ContactDetails = ({ className }: { className: string }) => {
  return (
    <div className={`${className} rounded-lg bg-secondary/40`}>
      <div className="flex flex-col justify-evenly h-full  md:p-10 p-5 gap-5">
        {ContactData().map((item) => (
          <div
            key={item.title}
            className="w-full flex flex-col justify-center items-center gap-4 bg-background p-5 rounded-lg"
          >
            <p className="text-2xl lg:text-3xl text-primary">{item.icon}</p>
            <h3 className="font-bold text-lg md:text-2xl capitalize">
              {item.title}
            </h3>
            <p>{item.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactDetails;
