import Image from 'next/image'
import { useState, useEffect } from 'react';
import { request } from 'graphql-request'
import { useRouter } from 'next/router'

export default function HeroSection() {
  const [state, setState] = useState({
    code: '', languages: [], name: '', emoji: '',
  })
  const { asPath } = useRouter()
  const theme = asPath.split('/')[1].toLowerCase()

  useEffect( () => {
    const countryCode = window.location.href.split('/')[4] || 'US'
    request(
      'https://countries.trevorblades.com/graphql', 
      `{ country (code: "${countryCode.toUpperCase()}") 
      { name code emoji languages { name } } }`,
    ).then(({ country } ) => {
      setState({...country})
    })
  }, []);

  const backgroundTheme = () => {
    return (
      theme == 'dark' ? "bg-slate-900" : 
      theme == 'light' ? "bg-white " : "bg-cyan-300"
    )
  }

  const makeImage = () => {
    return (
      <Image
        alt="country image"
        fill
        src={`https://www.geonames.org/flags/x/${state.code.toLowerCase()}.gif`}
      />
    )
  }

  const makeLanguages = () => {
    const bgColor = (
      theme == 'dark' ? 'bg-red-600 hover:bg-red-700' : 
      theme == 'light' ? 'bg-purple-600 hover:bg-purple-700' : 
      'bg-cyan-600 hover:bg-cyan-700'
    )
    return state.languages.map(({name}, idx) => {
      return (
        <div 
          key={idx}
          className ={`mx-auto items-center justify-center whitespace-nowrap 
          rounded-md border border-transparent px-4 py-2 
          text-base font-medium text-white shadow-sm
          ${bgColor}`}
        >
          {name}
        </div>
      )
    })
  }

  const makeTitle = () => {
    const color = theme == 'dark' ? "text-slate-100" : "text-slate-900"
    return (
      <h1 className={`text-4xl font-bold tracking-tight sm:text-6xl pb-1.5 ${color}`}>
      {state.name} {state.emoji}
    </h1>
    )
  }
  return (
    <div className={`isolate ${backgroundTheme()}`}>
      <div className={'mx-auto max-w-2xl py-12 relative px-6 lg:px-8'}>
        <div className="text-center">
            {makeTitle()}
          <div className="mx-auto flex relative center items-center pb-1.5 h-80 w-116">
            {makeImage()}
          </div>
          <div className="center items-center flex pt-3">
            {makeLanguages()}
          </div>
        </div>
      </div>
    </div>
  )
}