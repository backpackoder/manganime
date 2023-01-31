import { useAuth } from '../../context/AuthContext'
import { Typography } from '../ui'

import InfoGalery from './InfoGalery'
import StatsDropdowns from '../stats/StatsDropdowns'
import RatingInfos from './RatingInfos'
import FavoriteIcon from './FavoriteIcon'
import { usePresentation } from '../../hooks/queriesHooks'
import { useParams } from 'react-router-dom'

function InfoPresentation() {
  let { type, id } = useParams()
  const data = usePresentation(type, id)
  const info = data?.Page?.media[0]
  const { data: authUser, setData: execute } = useAuth()

  return (
    info && (
      <>
        <Typography
          component="h2"
          variant="h3"
          sx={{ textAlign: 'center', m: '0 auto' }}
        >
          {info.title.english ?? info.title.romaji}
        </Typography>
        <Typography>{info.title.native}</Typography>

        <FavoriteIcon info={info} />

        <InfoGalery />
        <RatingInfos info={info} />

        {authUser ? (
          <StatsDropdowns
            userDatas={authUser}
            contentInfos={info}
            executeUser={execute}
          />
        ) : null}
      </>
    )
  )
}

export default InfoPresentation
