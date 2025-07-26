import moment from 'moment'

const getLocalTimeAndDate = (timezone) => {
  const utc = moment()
  let localTimeOffset
  let localTimeStamp
  let localDate
  let localTime

  if (timezone < 0) {
    localTimeOffset = timezone / 3600

    localTimeStamp = moment
      .utc(utc)
      .subtract(Math.abs(localTimeOffset), 'hours')

    localDate = moment(localTimeStamp).format('MMMM DD')
    localTime = moment(localTimeStamp).format('hh:mm A')
  } else {
    localTimeOffset = timezone / 3600
    localTimeStamp = moment.utc(utc).add(Math.abs(localTimeOffset), 'hours')

    localDate = moment(localTimeStamp).format('MMMM DD')
    localTime = moment(localTimeStamp).format('hh:mm A')
  }

  return { date: localDate, time: localTime, timestamp: localTimeStamp }
}

module.exports = { getLocalTimeAndDate }
