import { useState, useEffect } from 'react';
import { request } from 'graphql-request'
import { useRouter } from 'next/router'
import SearchBarList from './searchBarList'

export default function SearchBar() {
  let [state, setState] = useState({ countries: [], input: '' })
  const { asPath } = useRouter()
  const theme = asPath.split('/')[1].toLowerCase()

  useEffect(() => {
    request(
      'https://countries.trevorblades.com/graphql', 
      '{ countries { name code } }'
    ).then(({countries}) => {
      const countryCodes = countries.map((country: any) => { 
        return `${country['name']} : ${country['code']}`
      })
      setState({...state, countries: countryCodes })  
    })
  }, []);

  const searchCountry = (event: any) => {
    setState({ ...state, input: event.target.value })
  }

  const assignTheme = () => {
    return (
      theme == 'dark' ? `text-white bg-black focus:bg-grey` : 
      theme == 'light' ? `text-gray-500 border bg-gray-50 focus:bg-white` :
      `text-gray-200 bg-cyan-700`
    )
  }

  return (
    <div className="relative z-10">
      <div className= "none overflow-auto">
        <input
          type="text"
          placeholder="Search for country"
          onChange={(event: any) => {searchCountry(event)}}
          className={`text-center w-full px-12 ${assignTheme()}`}
        />
        <SearchBarList input={state.input} countries={state.countries}/>
      </div>
    </div>
  )
}