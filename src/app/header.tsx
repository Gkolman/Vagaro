import SearchBar from './searchBar'
import { useRouter } from 'next/router'
import Image from 'next/image'
export default function Header() {
  const { asPath } = useRouter()
  const currentTheme = asPath.split("/")[1].toLowerCase()

  const themeButtonUrl = (theme: string) => { 
    return `/${theme}/${asPath.split("/")[2] || ''}`
  }

  const buttonTheme = (theme: string) => {
    return (
      theme == 'dark' ? "bg-slate-600 hover:bg-slate-700" : 
      theme == 'light' ? "bg-indigo-600 hover:bg-indigo-700" : 
      "bg-cyan-600 hover:bg-cyan-700"
    )
  }

  const themeButtons = () => {
    const themes = ['Dark', 'Light', 'Cyan']
    const upcaseTheme = currentTheme[0].toUpperCase() + currentTheme.slice(1)
    themes.splice(themes.indexOf(upcaseTheme), 1)
    return themes.map((theme, idx) => {
      return (
        <a
          key={idx}
          href={themeButtonUrl(theme)}
          className={
            `ml-4 inline-flex items-center justify-center whitespace-nowrap 
            rounded-md border border-transparent px-2 py-2 text-base 
            text-white shadow-sm  
            ${buttonTheme(theme.toLowerCase())}`
          }
        >
          {theme} Mode
        </a>
      )
    })
  }

  const backgroundTheme = () => {
    return currentTheme == 'dark' ? "bg-neutral-700" : 
    currentTheme == 'light' ? "bg-slate-100" : "bg-cyan-400"
  }

  const makeLogo = () => {
    return (
      <a href="https://www.vagaro.com/">
        <Image
          width={100}
          height={10}
          src="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/PublicImages/Images/vagaro-logo-new.svg" 
          alt="Vagaro" 
          aria-hidden="true"
        />
      </a>
    )
  }

  return (
    <div className={`relative z-10 mx-auto  flex items-center  py-6 
      md:justify-start md:space-x-15 border-gray-100 ${backgroundTheme()}`}>
      <div className="flex justify-start flex-1 ml-4">
        {makeLogo()}
      </div>
      <div className= "flex justify-center flex-1">
        <SearchBar/>
      </div>
      <div className="flex items-center justify-end flex-1 mr-4 ">
        {themeButtons()}
      </div>
    </div>
  )
}