'use client'

import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './CarouselArrowButton'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ProductImage } from "@prisma/client"

type ProductImages = ProductImage[];
  
type PropType = {
  slides: ProductImages
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla max-w-[22rem] m-auto">
  <div className="embla__viewport overflow-hidden" ref={emblaRef}>
    <div className="embla__container flex touch-pan-y">
      {slides.map((slide) => (
        <div className="embla__slide flex-none min-w-0 pl-4" key={slide.xata_id}>
          <div className="embla__slide__number shadow-inner border rounded-lg text-4xl font-semibold flex items-center justify-center h-[26rem]">
            <Image src={slide.imagePath} alt='teste' width={300} height={300}  priority />
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="embla__controls flex w-full items-center justify-center mt-6">
    <div className="embla__buttons flex items-center justify-center">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} className="embla__button flex justify-center"/>
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} className="embla__button flex justify-center"/>
    </div>
  </div>
</section>
  )
}

export default EmblaCarousel
