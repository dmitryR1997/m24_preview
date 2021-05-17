import React, { useState } from "react"
import PropTypes from "prop-types"

import "./Tabs.scss"

import TabPanel from "./TabPanel"
import TabButton from "./TabButton"

export const Tabs = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(1)

  const handleSelectTab = tabId => {
    setSelectedTab(tabId)
  }

  const buttons = React.Children.map(children, child => {
    const { id, disabled } = child.props
    const isSelected = selectedTab === id

    if(disabled) return

    return (
      <TabButton id={id} selected={isSelected} onClick={() => handleSelectTab(id)}>
        {child.props.label}
      </TabButton>
    )
  })

  const panels = React.Children.map(children, child => {
    const { id, disabled } = child.props
    const isSelected = selectedTab === id

    if (!isSelected || disabled) return

    return (
      <TabPanel id={id} selected={isSelected}>
        {child.props.children}
      </TabPanel>
    )
  })

  return (
    <div className="tabs">
      <div className="tabs__nav">
        {buttons}
      </div>

      <div className="tabs__content">
        {panels}
      </div>
    </div>
  )
}

export const Tab = () => {
  return null
}

Tab.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
}
