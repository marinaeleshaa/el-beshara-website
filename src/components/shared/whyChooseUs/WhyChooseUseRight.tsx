import MyBtn from "@/components/ui/MyBtn";

const WhyChooseUsRight = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} flex flex-col justify-center p-6 md:p-8 bg-secondary rounded-lg`}>
      <p className="text-primary/80 relative w-fit capitalize font-bold text-md md:text-lg  animated-underline mb-4">
        Why Choose Us
      </p>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
        Excellence in Every Detail
      </h2>
      <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris.
      </p>
      <MyBtn text="contact us" href="/contact" variant="primary" className="mt-4 w-fit" />
    </div>
  );
};

export default WhyChooseUsRight;
