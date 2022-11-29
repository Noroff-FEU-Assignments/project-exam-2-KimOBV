export function Heading(heading) {
  const headingStyle = {
    textAlign: heading.textAlign,
    fontSize: '2rem',
    fontWeight: 600,
  }
  return ( 
    <h1 style={headingStyle}>
      {heading.content}
    </h1> 
  ) 
}

export function BigHeading(heading) {
  const headingStyle = {
    textAlign: heading.textAlign,
    fontSize: '3.2rem',
    fontWeight: 600,
  }
  return ( 
    <h1 style={headingStyle}>
      {heading.content}
    </h1> 
  )
}

export function SubHeading(heading) {
  const headingStyle = {
    textAlign: heading.textAlign,
    fontSize: '1.6rem',
    fontWeight: 600,
  }
  return ( 
    <h2 style={headingStyle}>
      {heading.content}
    </h2> 
  )
}

export function SmHeading(heading) {
  const headingStyle = {
    textAlign: heading.textAlign,
    fontSize: '1.1rem',
    fontWeight: 600,
  }
  return ( 
    <h2 style={headingStyle}>
      {heading.content}
    </h2> 
  )
}


export function XsHeading(heading) {
  const headingStyle = {
    textAlign: heading.textAlign,
    fontSize: '.9rem',
    fontWeight: 600,
  }
  return ( 
    <h2 style={headingStyle}>
      {heading.content}
    </h2> 
  )
}

