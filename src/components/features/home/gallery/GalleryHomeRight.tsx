import MyBtn from "@/components/ui/MyBtn";

const GalleryHomeRight = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} p-4 group space-y-5`}>
      <p className="text-primary/80 relative w-fit capitalize font-bold text-md md:text-lg  animated-underline">
        Our Studio
      </p>
      <h2 className="text-foreground max-w-[80%] capitalize md:text-5xl text-3xl font-extrabold mt-5">
        Where Sound Comes to Life
      </h2>
      {/* <p className="text-foreground/90  md:text-lg text-base">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, doloribus cumque ad ullam sunt sit officia voluptas. Quo, repudiandae ipsam?
      </p> */}
      <ul className="list-disc list-inside text-foreground/90">
        <li
          className="
        80  md:text-lg text-base"
        >
          Professional audio engineering and mixing for all genres.
        </li>
        <li
          className="
        80  md:text-lg text-base"
        >
          High-quality recording sessions for vocals and instruments.
        </li>
        <li
          className="
        80  md:text-lg text-base"
        >
          Music production and arrangement to bring your ideas to life.
        </li>
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="w-full p-4 bg-secondary text-secondary-foreground rounded-md">
          <p className="text-base font-bold">Hours Of Recording</p>
          <p className="text-secondary-foreground/80">
            We have produced and recorded over{" "}
            <span className="font-bold text-primary">500</span> hours of music
            for artists
          </p>
        </div>
        <div className="w-full p-4 bg-secondary text-secondary-foreground rounded-md">
          <p className="text-base font-bold">Completed Projects</p>
          <p className="text-secondary-foreground/80">
            From singles to full albums, our team has successfully completed
            over <span className="font-bold text-primary">100</span> music
            projects{" "}
          </p>
        </div>
      </div>
      {/* <Link href="/gallery" className="inline-block bg-primary transition duration-300 cursor-pointer text-primary-foreground  hover:scale-105  rounded-md font-bold  capitalize p-2 px-4"></Link> */}
      <MyBtn href="/gallery" text="Explore Our Studio Gallery" />
    </div>
  );
};

export default GalleryHomeRight;
