"use client"
import DashboardHero from '@/components/shared/dashboard/DashboardHero'
import MasonryDashboard from '@/components/shared/dashboard/MasonaryDashboard'
import { images } from '@/data/images'

const page = () => {
  return (
        <div>
      <div className="space-y-10">
        <DashboardHero />
        <div className="bg-secondary/50 rounded-lg p-4">
      <div className="">
        <MasonryDashboard
          items={images}
          onSelectionChange={(ids) => console.log("Selected reels:", ids)}
          onRemove={(id) => console.log("Remove reel:", id)}
        />
      </div>
    </div>
      </div>
    </div>
  )
}

export default page