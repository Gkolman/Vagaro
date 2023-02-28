import { useRouter } from 'next/router'
interface Props {
  input: string;
  countries: Array <string>;
}
export default function SearchBarList({input, countries}: Props) {
  const { asPath } = useRouter()
  const theme = asPath.split('/')[1].toLowerCase()

  const constructList = (input: string) => {
    if (input.length < 1) return null
    return (
      <div className="none absolute bg-slate-200 z-10 text-center w-full">
        {
          countries.filter((country: string) => {
            return country.toLowerCase().indexOf(input.toLowerCase()) >-1
          }).map((country: string, index: number ) => {
            return constructItem(country, index)
          }).slice(0,7)
        }
      </div>
    )
  }
  const assignTheme = () => {
    return (
      theme == 'dark' ? `text-gray-200 bg-gray-800 hover:bg-gray-900` : 
      theme == 'light' ? `text-gray-500 hover:bg-gray-300` :
      `text-gray-200 bg-cyan-700 hover:bg-cyan-800`
    )
  }

  const constructItem = (country: string, index: Number) => {
    const countryCode = country.split(": ")[1]
    return (
      <a 
        key={index.toString()} 
        className={`w-full block ${assignTheme()}`}
        href={`/${asPath.split('/')[1]}/${countryCode}`}
      >
        {country}
      </a>
    )
  }
  return (
    constructList(input)
  ) 
}