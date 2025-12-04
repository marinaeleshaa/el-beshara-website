import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AboutMainRight = ({ className }: { className: string }) => {
  return (
    <div className={`${className} flex flex-col md:flex-row gap-5`}>
      <div className="h-[300px] md:h-[500px] sm:h-[500px] shrink-0">
        <Image
          src="/home/about2.jpg"
          alt="about"
          width={900}
          height={900}
          className="object-cover rounded-lg w-full h-full"
        />
      </div>
      <div className="flex-1 flex flex-col gap-5 justify-evenly">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1" className="bg-secondary p-1 rounded-lg mb-5">
            <div className="p-2 cursor-pointer">
              <AccordionTrigger className="text-primary text-lg md:text-2xl capitalize cursor-pointer">
                Our Vision
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance text-foreground">
                <p>
                  To be a beacon of faith-inspired creativity, empowering Christian artists 
                  and worship leaders to craft music that transforms hearts and glorifies God 
                  across generations.
                </p>
                <p>
                  We envision a world where every believer has access to professional-quality 
                  production that amplifies their message of hope, redemption, and divine love.
                </p>
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-secondary p-1 rounded-lg mb-5">
            <div className="p-2 cursor-pointer">
              <AccordionTrigger className="text-primary text-lg md:text-2xl capitalize cursor-pointer">
                Our Mission
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance text-foreground">
                <p>
                  To provide exceptional recording, production, and mixing services that honor 
                  God and serve the Christian music community with excellence, integrity, and compassion.
                </p>
                <p>
                  We are committed to creating a welcoming space where artists can freely express 
                  their faith through music, supported by cutting-edge technology and a team dedicated 
                  to bringing their spiritual vision to life.
                </p>
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-secondary p-1 rounded-lg">
            <div className="p-2 cursor-pointer">
              <AccordionTrigger className="text-primary text-lg md:text-2xl capitalize cursor-pointer">
                Our Values
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance text-foreground">
                <p>
                  <strong>Faith First:</strong> We place God at the center of everything we do, 
                  praying over each project and seeking His guidance in our creative process.
                </p>
                <p>
                  <strong>Excellence & Integrity:</strong> We deliver professional-quality work with 
                  honesty and transparency, treating every artist with respect and dignity.
                </p>
                <p>
                  <strong>Community & Service:</strong> We believe in building lasting relationships 
                  and serving the body of Christ through our gifts and talents.
                </p>
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default AboutMainRight;