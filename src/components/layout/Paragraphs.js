export default function BigParagraph(paragraph) {

  const paragraphStyle = {
    textAlign: paragraph.textAlign,
    margin: 0,
    fontSize: '1.15rem',
    maxWidth: '750px',
  }

  return ( <p style={paragraphStyle}>{paragraph.content}</p> ) 
}

export function Paragraph(paragraph) {

  const paragraphStyle = {
    textAlign: paragraph.textAlign,
    margin: 0,
    fontSize: '1rem',
    maxWidth: '750px',
  }

  return ( <p style={paragraphStyle}>{paragraph.content}</p> ) 
}