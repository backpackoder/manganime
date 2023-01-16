import React from 'react'
import useGetTopDatas from '../hooks/getTopDatas'
import TopView from './TopView'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import '../styles/top-css.css'

const rankReducer = (state, action) => {
  switch (action.type) {
    case 'Next':
      return { minRank: state.minRank + 1, maxRank: state.maxRank + 1 }
    case 'Prev':
      return { minRank: state.minRank - 1, maxRank: state.maxRank - 1 }
    default:
      return { minRank: 0, maxRank: 4 }
  }
}

const TopDetails = ({ name }) => {
  const { topDatas } = useGetTopDatas(name)
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = topDatas.length
  const [filteredTopDatas, setFilteredTopDatas] = React.useState([])
  const [rank, dispatch] = React.useReducer(rankReducer, {
    minRank: 0,
    maxRank: 4,
  })

  React.useEffect(() => {
    setFilteredTopDatas(
      topDatas.filter(
        (data) => data.rank > rank.minRank && data.rank <= rank.maxRank,
      ),
    )
  }, [rank.maxRank, rank.minRank, topDatas])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    dispatch({ type: 'Next' })
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    dispatch({ type: 'Prev' })
  }

  return (
    <>
      <article className=" top-article">
        <MobileStepper
          sx={{
            position: 'absolute',
            top: '15em',
            width: '100%',
            backgroundColor: 'inherit',
            '.MuiMobileStepper-dots': {
              display: 'none',
            },
          }}
          variant="dots"
          steps={maxSteps}
          position="static"
          nextButton={
            <Button
              sx={{
                zIndex: 1,
                color: 'rgb(68,68,68)',
                '&:hover': { backgroundColor: 'rgba(68,68,68,0.5)' },
              }}
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              className="top-article--arrow"
              sx={{
                zIndex: 1,
                color: 'rgb(68,68,68)',
                '&:hover': { backgroundColor: 'rgba(68,68,68,0.5)' },
              }}
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </Button>
          }
        />
        <h2>Top {name}</h2>
        <TopView datas={filteredTopDatas} />
      </article>
    </>
  )
}

export default TopDetails
