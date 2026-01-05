import Image from 'next/image'

const WhyChooseUsBottom = ({className}:{className:string}) => {
  return (
    <div className={`${className}  rounded-lg`}>
        <div className='w-full h-full'>

        <Image src="/home/mixer.jpg" alt="about" width={900} height={900} className="object-cover rounded-lg w-full h-full "/>
        </div>
    </div>
  )
}

export default WhyChooseUsBottom