const Footer = () => {

  // Contact Info
  const joyOatWebsite = 'https://www.joyserquina.com'
  const joyGithub = 'https://www.github.com/essjay05'
  const joyLinkedIn = 'https://www.linkedin.com/in/joy-serquina'

  return (
    <footer className='main-footer p-4 w-full'>
      <div className='contact-container flex flex-row w-full align-middle justify-between'>
        <p className='copyright title-style-6 text-left basis-1/2'>
          <a href={joyOatWebsite} target='_blank' rel='noreferrer' name={`Joy's Portfolio Site`}> &copy; Joy of All Trades LLC 2023</a>
        </p>
        <ul id='Contact' className='js-links basis-1/2 flex flex-wrap w-full justify-end'>
          <li className='mx-3'>
            <span className='title-style-6'>
              <a href={joyOatWebsite} target='_blank' rel='noreferrer' name={`Joy's Portfolio Site`}>www.joyserquina.com</a>
            </span>
          </li>
          <li className='mx-3'>
            <span className='title-style-6'>
              <a href={joyGithub} target='_blank' rel='noreferrer' name={`Joy's Github`}>Github</a>
            </span>
          </li>
          <li className='mx-3'>
            <span className='title-style-6'>
              <a href={joyLinkedIn} target='_blank' rel='noreferrer' name={`Joy's LinkedIn`}>LinkedIn</a>
            </span>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer