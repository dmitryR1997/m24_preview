import React, {useState, useEffect} from "react"
import AccordionSection from "@components/Surfaces/AccordionSection"

import "./Accordion.scss"

const Accordion = ({children}) => {
  const [openSections, setOpenSections] = useState({})

  const onClickHandler = (id) => {
    const isOpen = openSections[id]

    setOpenSections(prev => ({
      ...prev,
      [id]: !isOpen
    }))
  }

  useEffect(() => {
    if (children.length >= 1) {
      children.filter(item => item.props.open).forEach((item) => {
        setOpenSections(prev => ({
          ...prev,
          [item.props.id]: true
        }))
      })
    } else {
      if (children.props.open) {
        setOpenSections(prev => ({
          ...prev,
          [children.props.id]: true
        }))
      }
    }
  }, [])

  return (
    <div className="accordion">
      {children.length >= 1 ?
        children.map((item, i) => (
          <AccordionSection
            key={i}
            onClick={() => onClickHandler(item.props.id)}
            isOpen={!!openSections[item.props.id]}
            isLink={!item.props.children}
            label={item.props.label}
          >
            {item}
          </AccordionSection>
        )) : <AccordionSection
          onClick={() => onClickHandler(children.props.id)}
          isOpen={!!openSections[children.props.id]}
          isLink={!children.props.children}
          label={children.props.label}
        >
          {children}
        </AccordionSection>
      }
    </div>
  )
}

export default Accordion
