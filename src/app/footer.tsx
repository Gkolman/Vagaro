import Image from 'next/image'
import f from '../../public/static/footer.png'
export default function footer(){
  return (
    <Image
    alt="image"
    width={2400} 
    height={2400}
    src={f.src}
    />
  )
}