import ImagesLayout from "@/components/features/gallery/images/ImagesLayout";
import { getImagesServerAction } from "./actions";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ImagesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;

  const { data: images, meta } = await getImagesServerAction({
    page,
    limit: 20,
  });

  return (
    <div className="">
      <ImagesLayout images={images} meta={meta} />
    </div>
  );
}
