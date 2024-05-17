import EmblaCarousel from '@/components/imgSlider/Carousel'
import React from 'react'


const OPTIONS = {loop:true}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function page() {
  return (
    <div className='grid w-full max-h-full grid-cols-2 pt-20'>
      <div>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div className='flex justify-center items-center'>
        <h1>hello</h1>
      </div>
    </div>
  )
}
