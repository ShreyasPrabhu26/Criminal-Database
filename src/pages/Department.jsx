import React from 'react'
import VisionAndMission from '../components/VisionAndMission'
import ScrollToTop from '../utility/ScrollToTop'

const Department = () => {

  const departmentCard = (cardHeading) => {
    return (
      <div className="departmentCard">
        <div className="D-cardHeading">{cardHeading}</div>
        <div className="D-cardBody">Lorem ipsum dolor sit amet.</div>
        <div className="D-cardfooter">
          <a href="#">Read More --&gt;</a>
        </div>
      </div>
    )
  }
  return (
    <div>
      <ScrollToTop />
      <VisionAndMission />
      <div className="departmentConatiner">
        <div className="departmentHeader">
          Explore Police<br />
          Services & Information</div>
        <div className="departmentInnerBody">
          <div className="departmentCards">
            {departmentCard("Driver Licenses")}
            {departmentCard("Business License")}
            {departmentCard("Report Crime")}
            {departmentCard("Events Permission")}
            {departmentCard("Customer Service")}
            {departmentCard("Pay Tickets")}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Department