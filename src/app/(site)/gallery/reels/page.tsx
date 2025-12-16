import React from 'react'
import { getReelsServerAction } from './actions';
import ReelsLayout from '@/components/features/gallery/reels/ReelsLayout';

export const metadata = {
  title: "Reels | El-Beshara Studio",
  description: "Creating amazing musical experiences for the world.",
}

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}
const page = async ({ searchParams }: PageProps) => {

  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  const { data: reels, meta } = await getReelsServerAction({ page, limit: 20, isReel: true });
  return (
    <div>
      <ReelsLayout reels={reels} meta={meta} />
    </div>
  )
}

export default page