import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [pwd, setPwd] = useState('')

  // Ref Hook
  const pwdRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let numbers = '0123456789'
    let specialCharacters = '!@#$%^&*()_+'
    let password = ''
    let allowed = characters
    if (numberAllowed) allowed += numbers
    if (characterAllowed) allowed += specialCharacters
    for (let i = 0; i < length; i++) {
      password += allowed.charAt(Math.floor(Math.random() * allowed.length))
    }
    setPwd(password)
  }, [length, numberAllowed, characterAllowed, setPwd])

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(pwdRef.current.value)
  }, [pwd])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <>
      <h1 className='text-4xl text-white text-center my-6'>Password Generator</h1>

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text"
          value={pwd}
          className='outline-none w-full py-1 px-3 text-black'
          placeholder='password'
          readOnly
          ref={pwdRef} />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
                  onClick={copyPasswordToClipboard}>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(event) => setLength(event.target.value)} />
            <label> Length: {length}</label>
          </div>
        

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => setNumberAllowed((prev) => !prev)} />
            <label >Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={characterAllowed}
            id='characterInput'
            onChange={() => setCharacterAllowed((prev) => !prev)} />
            <label >Characters</label>
          </div>          
        </div>

        <div className='flex justify-center my-6 gap-x-6'>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5'
                  onClick={passwordGenerator}>Regenerate</button>
        </div>
      
    </div>
    </>

    
  )
}

export default App
