import PenAndPaper from './svg/PenAndPaper'

const Header = () => {
  return (
    <header className='flex flex-row justify-between'>
      <div className='brand-container flex flex-row align-middle font-semibold'>
        <PenAndPaper></PenAndPaper>
        <h1>Joy-OAT Whiteboard</h1>
      </div>
      <a href='#Contact'>Contact</a>
    </header>
  )
}

export default Header