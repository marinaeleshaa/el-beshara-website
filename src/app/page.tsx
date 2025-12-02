import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="h-[200px] bg-background">
        <p className="text-foreground">hello from test</p>
      </div>
      <div className="h-[200px] bg-primary">
        <p className="text-primary-foreground">hello from test</p>
      </div>
      <div className="h-[200px] bg-secondary">
        <p className="text-secondary-foreground">hello from test</p>
      </div>
     
    </div>
  );
}
